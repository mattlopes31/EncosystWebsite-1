'use client';

import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Zap, Globe, Award, Shield, Gauge, Database, Cpu, Activity, ChevronRight, Check, Brain, CircuitBoard, Monitor } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

function CountUpAnimation({ end, duration = 1500, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * end);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ImageCarousel({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

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

export default function HomePage() {
  const tProducts = useTranslations('products');
  const tCommon = useTranslations('common');
  const tHero = useTranslations('hero');

  const services = [
    { 
      title: tProducts('automatisme.title'),
      description: tProducts('automatisme.description'),
      icon: Brain,
      details: ['Design personnalisé sur mesure', 'Fabrication dans nos ateliers', 'Programmes optimisés'],
      images: [
        '/imagesV2/Armoires/Armoire_de_controle_comande_4.png',
        '/imagesV2/Armoires/3 Panel de control central hidroeléctricaplanta .jpg',
        '/imagesV2/Armoires/4 Armoire de controle comande 2.jpg'
      ],
      link: '/produits/armoires'
    },
    { 
      title: tProducts('ingenierie.title'),
      description: tProducts('ingenierie.description'),
      icon: CircuitBoard,
      details: ['Postes HTA', 'Distributions des auxiliaires', 'Systèmes Auxiliaires'],
      images: [
        '/imagesV2/Ingénierie du systeme electrique/Cellules HTA 1.jpg',
        '/imagesV2/Ingénierie du systeme electrique/Chargeur de batteries.jpg',
        '/imagesV2/Ingénierie du systeme electrique/TGBT.jpg'
      ],
      link: '/produits/systemeElectrique'
    },
    { 
      title: tProducts('scada.title'),
      description: tProducts('scada.description'),
      icon: Monitor,
      details: ['Interface ergonomique', 'Accès distant', 'Historisation','Outils d/aide à la maintenance préventive' ],
      images: [
        '/images/scada.png',
        '/imagesV2/SCADA/architecture.png',
        '/images/scada3.png'
      ],
      link: '/produits/scada'
    },
    { 
      title: tProducts('dataVisualisation.title'),
      description: tProducts('dataVisualisation.description'),
      icon: Database,
      details: ['Industrie 4.0', 'IoT & BigData', 'Tableaux de bord dynamiques'],
      images: [
        '/images/Encosyst Web Report.png',
        '/imagesV2/Visualisation de données et rapports/2022-07-04 08_46_50-Productions - ENCOSyst Web Report et 12 pages de plus - Personnel – Microsoft​ E.png'
      ],
      link: '/produits/dataVisualisation'
    },
    { 
      title: tProducts('vitesse.title'),
      description: tProducts('vitesse.description'),
      icon: Gauge,
      details: ['Tous types de turbines', 'Conformes aux normes IEC et IEEE', 'Groupes hydrauliques'],
      images: [
        '/images/Imagescontour/HPU Speed governor.png',
        '/imagesV2/Régulateurs de vitesse/Retrofit régulateur de vitesse.png'
      ],
      link: '/produits/regulationVitesse'
    },
    { 
      title: tProducts('tension.title'),
      description: tProducts('tension.description'),
      icon: Zap,
      details: ['Jusqu\'à 1000Adc', 'Régulateurs intégrés', 'Haute précision'],
      images: [
        'imagesV2/Régulateurs de tension/excitation statique (2).jpg',
        'imagesV2/Régulateurs de tension/Static excitation system FAT.jpg',
      ],
      link: '/produits/regulationTensionetExcitation'
    },
    { 
      title: tProducts('protections.title'),
      description: tProducts('protections.description'),
      icon: Shield,
      details: ['Protection alternateurs', 'Protection transformateurs', 'Protection lignes'],
      images: [
        'imagesV2/Protetctions/relais de protection.jpg',
        'imagesV2/Protetctions/protection relay calculation.jpg',
        'imagesV2/Protetctions/Armoire protection.jpg'
      ],
      link: '/produits/protections'
    },
    { 
      title: tProducts('instrumentation.title'),
      description: tProducts('instrumentation.description'),
      icon: Gauge,
      details: ['Installation complète', 'Barrages et prises d\'eau', 'Large gamme de capteurs'],
      images: [
        'imagesV2/Instrumentation/Instrumentation.jpg'
      ],
      link: '/produits/instrumentation'
    }
  ];

  return (
    <main>
      <Navbar />
      <Hero />
      
      {/* Section Présence Internationale */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#8DC63E]/20 text-[#8DC63E] px-4 py-2 rounded-full text-lg font-semibold mb-4">
                Présence Internationale
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Une Expertise Mondiale
              </h2>
            </div>
            
            <div className="mb-12">
              <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="/images/worldencosyst 2.png"
                    alt="Carte de présence mondiale ENCOSYST"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
                Depuis 2011, ENCOSYST accompagne des projets hydroélectriques sur 4 continents, 
                de la France à l'Amérique Centrale, en passant par l'Afrique et l'Asie.
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                href="/references"
                className="inline-flex items-center gap-2 bg-[#8DC63E] text-white hover:bg-[#7AB62F] px-8 py-4 rounded-xl font-bold transition-all shadow-xl text-lg hover:scale-105"
              >
                Découvrir nos références
                <ChevronRight size={20} />
              </Link>
            </div>  
          </div>
        </div>
      </section>

      {/* Section Chiffres Clés */}
      <section className="py-24 bg-[#8DC63E]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-lg font-semibold mb-4">
                Nos Chiffres
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Une Expertise Éprouvée
              </h2>
            </div>

            {/* Première ligne */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
              <div className="text-center group">
                <div className="bg-white p-8 rounded-2xl border-2 border-white/50 group-hover:border-white transition-all shadow-lg group-hover:shadow-xl">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-3">
                    <CountUpAnimation end={14} />
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">{tHero('experience')}</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white p-8 rounded-2xl border-2 border-white/50 group-hover:border-white transition-all shadow-lg group-hover:shadow-xl">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-3">
                    <CountUpAnimation end={12} />
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">{tHero('countries')}</div>
                </div>
              </div>
            </div>

            {/* Deuxième ligne */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="bg-white p-8 rounded-2xl border-2 border-white/50 group-hover:border-white transition-all shadow-lg group-hover:shadow-xl">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400 mb-3">
                    <CountUpAnimation end={40} suffix="+" />
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">{tHero('projects')}</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white p-8 rounded-2xl border-2 border-white/50 group-hover:border-white transition-all shadow-lg group-hover:shadow-xl">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400 mb-3">
                    <CountUpAnimation end={320} />
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">MW installés</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white p-8 rounded-2xl border-2 border-white/50 group-hover:border-white transition-all shadow-lg group-hover:shadow-xl">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400 mb-3">
                    <CountUpAnimation end={8} />
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">Collaborateurs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Domaines de Compétences */}
      <section id="solutions" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="inline-block bg-[#8DC63E]/20 text-[#8DC63E] px-4 py-2 rounded-full text-lg font-semibold mb-4">
              Nos Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Domaines de Compétences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise complète en systèmes de contrôle-commande pour centrales hydroélectriques
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={service.link}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all group shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-900">
                    <ImageCarousel images={service.images} alt={service.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Icon className="text-white" size={28} />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-lg flex items-center gap-2 shadow-xl">
                        {tCommon('learnMore')}
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-bold text-2xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.details.map((detail, idx) => (
                        <span 
                          key={idx}
                          className="text-lg bg-orange-50 border border-orange-200 text-orange-600 px-4 py-2 rounded-full font-medium"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>  

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-orange-400 via-orange-400 to-orange-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Un Projet en Vue ?
          </h3>
          <p className="text-xl md:text-2xl text-orange-50 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discutons de vos besoins et trouvons ensemble la solution adaptée à votre installation
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-orange-400 px-10 py-5 rounded-xl font-bold transition-all text-lg shadow-2xl hover:shadow-white/20 hover:scale-105"
          >
            Nous Contacter
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}