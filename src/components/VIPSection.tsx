import React, { useState } from 'react';
import { Crown, Star, Diamond, Gift, Users, Shield } from 'lucide-react';
import ContactModal from './ContactModal';

const VIPSection: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const vipTiers = [
    {
      name: 'Silver VIP',
      price: 'R$ 15/mês',
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-400',
      icon: Star,
      features: [
        'Canal VIP exclusivo',
        'Cor especial no Discord',
        'Prioridade no suporte',
        'Acesso a eventos especiais',
        'Badge exclusivo no perfil'
      ],
      popular: false
    },
    {
      name: 'Gold VIP',
      price: 'R$ 25/mês',
      color: 'from-yellow-400 to-yellow-600',
      borderColor: 'border-yellow-400',
      icon: Crown,
      features: [
        'Todos os benefícios Silver',
        'Sala de voz VIP privada',
        'Sorteios exclusivos mensais',
        'Acesso antecipado a novidades',
        'Personalização de perfil',
        'Suporte prioritário 24/7'
      ],
      popular: true
    },
    {
      name: 'Diamond VIP',
      price: 'R$ 50/mês',
      color: 'from-blue-400 to-purple-600',
      borderColor: 'border-blue-400',
      icon: Diamond,
      features: [
        'Todos os benefícios Gold',
        'Acesso a beta de recursos',
        'Reuniões mensais com staff',
        'Influência em decisões da comunidade',
        'Kit de boas-vindas físico',
        'Acesso vitalício a eventos',
        'Mentoria personalizada'
      ],
      popular: false
    }
  ];

  const currentVIPs = [
    {
      id: 1,
      name: 'João Silva',
      tier: 'Diamond',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      joinDate: '2023-01-15',
      color: 'from-blue-400 to-purple-600'
    },
    {
      id: 2,
      name: 'Maria Santos',
      tier: 'Gold',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
      joinDate: '2023-03-22',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      tier: 'Silver',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      joinDate: '2023-05-10',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      tier: 'Gold',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      joinDate: '2023-04-18',
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  return (
    <section id="vips" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Membros VIP
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Torne-se um membro VIP e desfrute de benefícios exclusivos, 
            acesso prioritário e experiências únicas na nossa comunidade
          </p>
        </div>

        {/* VIP Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {vipTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <div
                key={index}
                className={`relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border-2 ${tier.borderColor} hover:scale-105 transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${tier.color} mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-3xl font-bold text-white">{tier.price}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className={`w-full py-3 px-6 bg-gradient-to-r ${tier.color} text-white font-bold rounded-xl hover:opacity-90 transition-opacity`}
                >
                  Assinar Agora
                </button>
              </div>
            );
          })}
        </div>

        {/* Current VIPs */}
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-red-900/30">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-red-600 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Nossos Membros VIP
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentVIPs.map((vip) => (
              <div
                key={vip.id}
                className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50 hover:border-red-600/50 transition-colors text-center"
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={vip.avatar}
                    alt={vip.name}
                    className="w-20 h-20 rounded-full border-2 border-red-600"
                  />
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${vip.color} rounded-full flex items-center justify-center`}>
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-white mb-2">{vip.name}</h4>
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${vip.color} text-white text-sm font-medium rounded-full mb-2`}>
                  {vip.tier} VIP
                </span>
                <p className="text-gray-400 text-sm">
                  Membro desde {new Date(vip.joinDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 mb-4">
              Junte-se aos nossos {currentVIPs.length} membros VIP e faça parte da elite da comunidade!
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center text-yellow-400">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm">Benefícios Exclusivos</span>
              </div>
              <div className="flex items-center text-green-400">
                <Gift className="w-5 h-5 mr-2" />
                <span className="text-sm">Recompensas Mensais</span>
              </div>
            </div>
          </div>
        </div>

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          type="general"
        />
      </div>
    </section>
  );
};

export default VIPSection;