'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Send, User, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    
    try {
      // L'API de contact n'est pas liée à la locale
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        let serverError = '';
        try {
          const data = await response.json();
          serverError = data?.error || '';
        } catch {
          // ignore JSON parse errors
        }
        setErrorMessage(serverError);
        setStatus('error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage('');
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Infos contact */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#8DC63E]/10 border-2 rounded-xl flex items-center justify-center flex-shrink-0" style={{ borderColor: '#8DC63E' }}>
                    <MapPin size={28} style={{ color: '#8DC63E' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{t('address')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      13 Impasse Perbost - Zone Perbost<br />
                      31800 Labarthe Inard<br />
                      France
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      {t('atPyrenees')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-orange-50 border-2 border-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-orange-500" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{t('phone')}</h3>
                    <a 
                      href="tel:+33561953342"
                      className="text-gray-600 hover:text-orange-500 transition-colors text-lg"
                    >
                      +33 (0) 5 61 95 33 42
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#8DC63E]/10 border-2 rounded-xl flex items-center justify-center flex-shrink-0" style={{ borderColor: '#8DC63E' }}>
                    <Mail size={28} style={{ color: '#8DC63E' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{t('email')}</h3>
                    <a 
                      href="mailto:contact@encosyst.fr"
                      className="text-gray-600 transition-colors"
                      style={{ color: '#8DC63E' }}
                      onMouseEnter={(e) => e.target.style.color = '#7AB62F'}
                      onMouseLeave={(e) => e.target.style.color = '#8DC63E'}
                    >
                      contact@encosyst.fr
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-orange-50 border-2 border-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="text-orange-500" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{t('legalRepresentative')}</h3>
                    <p className="text-gray-600">Laurent LOPES</p>
                    <p className="text-gray-500 text-sm mt-2">{t('siteManager')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br p-8 rounded-2xl border-2 shadow-lg" style={{ background: 'linear-gradient(to bottom right, rgba(141, 198, 62, 0.1), white)', borderColor: '#8DC63E' }}>
                <h3 className="font-bold text-lg text-gray-900 mb-4">{t('legalInfo')}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">{t('responsible')} :</span> M. Laurent LOPES</p>
                  <p><span className="font-medium">{t('design')} :</span> ENCOSYST</p>
                  <p><span className="font-medium">{t('hosting')} :</span> Prosoluce</p>
                  <p><span className="font-medium">{t('complaints')} :</span> {t('contactUs')}</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white p-10 rounded-2xl border-2 border-gray-200 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('sendMessage')}</h3>
              
              {/* Message de succès */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: 'rgba(141, 198, 62, 0.1)', border: '2px solid #8DC63E' }}>
                  <CheckCircle size={24} style={{ color: '#8DC63E' }} />
                  <p className="font-medium" style={{ color: '#7AB62F' }}>{t('success')}</p>
                </div>
              )}

              {/* Message d'erreur */}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                  <p className="text-red-700 font-medium">{errorMessage || t('error')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder={t('name')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder={t('email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder="+33 X XX XX XX XX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400 resize-none disabled:opacity-50"
                    placeholder={t('message')}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-bold transition-all text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('send')}
                    </>
                  )}
                </button>
                
                <p className="text-gray-500 text-xs text-center">
                  * {t('required')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}