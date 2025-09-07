import React, { useState } from 'react';
import { Play, Users, ExternalLink, Star, TrendingUp } from 'lucide-react';
import ContactModal from './ContactModal';

const InfluencersSection: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const influencers = [
    {
      id: 1,
      name: 'StreamerPro',
      platform: 'Twitch',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: '15.2K',
      specialty: 'Gaming & Entretenimento',
      description: 'Streamer focado em jogos competitivos e interação com a comunidade',
      link: 'https://twitch.tv/streamerpro',
      verified: true,
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 2,
      name: 'ContentCreator',
      platform: 'YouTube',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: '28.5K',
      specialty: 'Tutoriais & Reviews',
      description: 'Criadora de conteúdo educativo sobre tecnologia e gaming',
      link: 'https://youtube.com/@contentcreator',
      verified: true,
      color: 'from-red-500 to-red-700'
    },
    {
      id: 3,
      name: 'TikTokStar',
      platform: 'TikTok',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: '42.1K',
      specialty: 'Conteúdo Viral',
      description: 'Especialista em trends e conteúdo viral para a comunidade jovem',
      link: 'https://tiktok.com/@tiktokstar',
      verified: false,
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 4,
      name: 'InstaInfluencer',
      platform: 'Instagram',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: '18.7K',
      specialty: 'Lifestyle & Gaming',
      description: 'Influenciadora focada em lifestyle gamer e reviews de produtos',
      link: 'https://instagram.com/instainfluencer',
      verified: true,
      color: 'from-pink-400 to-purple-600'
    }
  ];

  const programBenefits = [
    {
      title: 'Suporte Dedicado',
      description: 'Equipe especializada para apoiar seu crescimento',
      icon: Users
    },
    {
      title: 'Colaborações Exclusivas',
      description: 'Parcerias com outros criadores da nossa rede',
      icon: Star
    },
    {
      title: 'Recursos Premium',
      description: 'Acesso a ferramentas e recursos exclusivos',
      icon: TrendingUp
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitch': return '🎮';
      case 'youtube': return '📺';
      case 'tiktok': return '🎵';
      case 'instagram': return '📸';
      default: return '🌟';
    }
  };

  return (
    <section id="influencers" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos Influencers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça os criadores de conteúdo que fazem parte da nossa comunidade 
            e descobrem como você também pode se tornar um influencer parceiro
          </p>
        </div>

        {/* Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="group bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-6">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-20 h-20 mx-auto rounded-full border-2 border-red-600"
                />
                {influencer.verified && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="text-2xl">{getPlatformIcon(influencer.platform)}</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {influencer.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className={`px-3 py-1 bg-gradient-to-r ${influencer.color} text-white text-sm font-medium rounded-full`}>
                    {influencer.platform}
                  </span>
                  <span className="text-red-400 font-semibold text-sm">
                    {influencer.followers}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm font-medium mb-3">
                  {influencer.specialty}
                </p>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {influencer.description}
                </p>
                
                <a
                  href={influencer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors group-hover:scale-105"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Seguir
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Influencer Program */}
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-red-900/30">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-red-600 rounded-full mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Programa de Influencers
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Faça parte da nossa rede de criadores de conteúdo e receba suporte 
              exclusivo para crescer sua audiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {programBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-900/60 rounded-xl border border-gray-700/50"
                >
                  <div className="inline-flex p-3 bg-red-600 rounded-full mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-bold text-white mb-4">
              Requisitos para Participar
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="flex items-center p-4 bg-gray-900/60 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                <span className="text-gray-300">Mínimo de 1K seguidores em qualquer plataforma</span>
              </div>
              <div className="flex items-center p-4 bg-gray-900/60 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                <span className="text-gray-300">Conteúdo regular e de qualidade</span>
              </div>
              <div className="flex items-center p-4 bg-gray-900/60 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                <span className="text-gray-300">Alinhamento com valores da comunidade</span>
              </div>
              <div className="flex items-center p-4 bg-gray-900/60 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                <span className="text-gray-300">Disponibilidade para colaborações</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
            >
              Candidatar-se ao Programa
            </button>
          </div>
        </div>

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          type="influencer"
        />
      </div>
    </section>
  );
};

export default InfluencersSection;