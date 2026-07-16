'use client';

import { Monitor, Check, Smartphone, Wrench, ArrowLeft } from 'lucide-react';
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
                index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ScadaPage() {
  // FIX: Changed from 'products.scada.page' to 'products.scada.scada.page'
  const t = useTranslations('products.scada.scada.page');

  const images = [
    '/imagesV2/SCADA/SCADA HEPP.png',
    '/imagesV2/SCADA/SCADA SLD.png',
    '/imagesV2/SCADA/SCADA Toma.png'
  ];

  const mainFeatures = [
    {
      icon: Monitor,
      title: t('mainFeatures.centralizedSupervision.title'),
      items: t.raw('mainFeatures.centralizedSupervision.items')
    },
    {
      icon: Smartphone,
      title: t('mainFeatures.remoteAccess.title'),
      items: t.raw('mainFeatures.remoteAccess.items')
    },
    {
      icon: Wrench,
      title: t('mainFeatures.maintenanceTools.title'),
      items: t.raw('mainFeatures.maintenanceTools.items')
    }
  ];

  const specifications = t.raw('specifications.items');
  const introParagraphs = t.raw('intro');

  return (
    <main className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">

      {/* Back Button */}
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
        <div className="max-w-6xl mx-auto flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Monitor className="text-white" size={40} />
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
      </section>

      {/* Carousel */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <ImageCarousel images={images} alt="SCADA" />
          </div>
        </div>
      </section>

      {/* Intro paragraphs */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-lg">

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('subtitle')}
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            {/* FIX: Added safety check for array */}
            {Array.isArray(introParagraphs) && introParagraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {t('mainFeatures.title')}
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {mainFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-orange-500 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feat.title}</h3>

                <ul className="space-y-3">
                  {feat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-orange-600 mt-1" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Specifications */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('specifications.title')}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}