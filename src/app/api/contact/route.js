import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Variables SMTP manquantes:', {
        SMTP_USER: process.env.SMTP_USER ? 'défini' : 'manquant',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD ? 'défini' : 'manquant'
      });
      return NextResponse.json(
        { error: 'Configuration email incomplète. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    const smtpConfig = {
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: process.env.SMTP_PASSWORD.trim().replace(/\s+/g, '')
      }
    };

    if (process.env.SMTP_HOST) {
      smtpConfig.host = process.env.SMTP_HOST;
      smtpConfig.port = parseInt(process.env.SMTP_PORT || '587');
      smtpConfig.secure = process.env.SMTP_SECURE === 'true';
      delete smtpConfig.service;
    }

    const transporter = nodemailer.createTransport(smtpConfig);

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Erreur de vérification SMTP:', verifyError);
      const code = verifyError?.code;
      if (code === 'EAUTH') {
        return NextResponse.json(
          {
            error:
              'Authentification SMTP refusée (EAUTH 535). Vérifie que le MOT DE PASSE D’APPLICATION a été généré sur le même compte Google que SMTP_USER, et qu’il est collé sans espaces.'
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: 'Erreur de configuration email. Vérifiez vos identifiants SMTP.' },
        { status: 500 }
      );
    }

    const fromAddress = process.env.SMTP_USER.trim();

    const toAddress = (process.env.CONTACT_EMAIL_TO || 'contact@encosyst.fr').trim();
    const bccList = (process.env.CONTACT_EMAIL_BCC || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const info = await transporter.sendMail({
      // Important: le "from" doit être cohérent avec le compte SMTP (sinon Gmail peut refuser)
      from: `Site ENCOSYST <${fromAddress}>`,
      to: toAddress,
      ...(bccList.length ? { bcc: bccList } : {}),
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #8DC63E; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background-color: white; padding: 30px; border: 1px solid #ddd; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #666; }
              .message-box { background-color: #f5f5f5; padding: 15px; border-left: 4px solid #8DC63E; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Nouveau message depuis le site ENCOSYST</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Nom :</span> ${name}
                </div>
                <div class="field">
                  <span class="label">Email :</span> ${email}
                </div>
                <div class="field">
                  <span class="label">Téléphone :</span> ${phone || 'Non renseigné'}
                </div>
                <div class="field">
                  <span class="label">Message :</span>
                  <div class="message-box">${String(message).replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Nouveau message depuis le site ENCOSYST\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'Non renseigné'}\n\nMessage:\n${message}`
    });

    console.log('Email envoyé:', {
      messageId: info.messageId,
      to: toAddress,
      accepted: info.accepted,
      rejected: info.rejected
    });

    if (Array.isArray(info.rejected) && info.rejected.length > 0) {
      return NextResponse.json(
        {
          error:
            "L'email a été refusé par le serveur de destination (rejected). Vérifie la boîte, l'antispam et/ou utilise un destinataire de test."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      to: toAddress,
      accepted: info.accepted,
      rejected: info.rejected
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);

    let errorMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
    if (error?.code === 'EAUTH') errorMessage = 'Erreur d\'authentification. Vérifiez votre email et mot de passe d\'application.';
    if (error?.code === 'ECONNECTION') errorMessage = 'Impossible de se connecter au serveur email.';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

