'use client';

import { Activity, Check, Zap, TrendingUp, ArrowLeft, Radio, Shield, Gauge } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${alt} - ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RegulationTensionExcitationPage() {
  const t = useTranslations('products.tension.page');
  
  const pointsForts = t.raw('pointsForts.items');
  const fonctionnalitesRegulateur = {
    modeRegulation: t.raw('fonctionnalitesRegulateur.modeRegulation.items'),
    autresFonctionnalites: t.raw('fonctionnalitesRegulateur.autresFonctionnalites.items')
  };
  const armoiresExcitationItems = t.raw('armoiresExcitation.items');

  const images = [
    '/imagesV2/Régulateurs de tension/excitation statique (2).jpg',
    '/imagesV2/Régulateurs de tension/Static excitation system FAT.jpg',
  ];

  return (
    <main className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 mb-8">
        <Link 
          href="/#solutions"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
        >
          <ArrowLeft size={20} />
          {t('backButton')}
        </Link>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Zap className="text-white" size={40} />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                {t('mainTitle')}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carrousel d'images */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <ImageCarousel images={images} alt={t('mainTitle')} />
          </div>
        </div>
      </section>

      {/* Excitation de Tension */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('excitationTension.title')}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>{t('excitationTension.p1')}</p>
              <p>{t('excitationTension.p2')}</p>
              <p>{t('excitationTension.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Armoires d'Excitation Statique */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('armoiresExcitation.title')}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>{t('armoiresExcitation.intro')}</p>
              <ul className="space-y-3">
                {armoiresExcitationItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <strong>{item.title} :</strong> {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologie et Service */}
      {/* Points forts */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('pointsForts.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pointsForts.map((point, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border-2 border-gray-200 p-8 hover:border-orange-500 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={24} className="text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {point.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités du régulateur */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-orange-200 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Gauge size={32} className="text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('fonctionnalitesRegulateur.title')}
              </h2>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {t('fonctionnalitesRegulateur.modeRegulation.title')}
            </h3>
            <ul className="space-y-2 mb-6">
              {fonctionnalitesRegulateur.modeRegulation.map((fonc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="text-orange-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">{fonc}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {t('fonctionnalitesRegulateur.autresFonctionnalites.title')}
            </h3>
            <ul className="space-y-2">
              {fonctionnalitesRegulateur.autresFonctionnalites.map((fonc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="text-orange-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">{fonc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}