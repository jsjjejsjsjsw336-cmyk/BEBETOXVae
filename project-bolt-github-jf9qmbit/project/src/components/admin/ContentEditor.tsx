import React, { useState } from 'react';
import { Save, Eye, Edit3, RefreshCw } from 'lucide-react';

const ContentEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    hero: {
      title: '40 Sabores',
      subtitle: 'A comunidade mais saborosa do Discord',
      description: 'Junte-se a mais de 1.200 membros para conversas, jogos e diversão!'
    },
    about: {
      title: 'Sobre a 40 Sabores',
      description: 'A comunidade 40 Sabores nasceu com o propósito de reunir pessoas apaixonadas por conversas interessantes, jogos e momentos de diversão.',
      mission: 'Criar um espaço seguro e divertido onde todos possam expressar sua personalidade e fazer amizades duradouras.',
      values: 'Respeito mútuo, diversidade, inclusão e a crença de que cada membro contribui para tornar nossa comunidade ainda melhor.'
    },
    footer: {
      description: 'A comunidade mais saborosa do Discord. Junte-se a nós para conversas interessantes, jogos divertidos e amizades duradouras.',
      copyright: '© 2024 40 Sabores. Feito com ❤️ para a comunidade.'
    }
  });

  const contentSections = [
    { id: 'hero', label: 'Seção Principal', icon: '🏠' },
    { id: 'about', label: 'Sobre Nós', icon: '📖' },
    { id: 'footer', label: 'Rodapé', icon: '📄' }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Aqui seria feita a chamada para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Conteúdo salvo com sucesso!');
    } catch (error) {
      alert('Erro ao salvar conteúdo');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderHeroEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Título Principal
        </label>
        <input
          type="text"
          value={content.hero.title}
          onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Subtítulo
        </label>
        <input
          type="text"
          value={content.hero.subtitle}
          onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Descrição
        </label>
        <textarea
          value={content.hero.description}
          onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Título da Seção
        </label>
        <input
          type="text"
          value={content.about.title}
          onChange={(e) => handleInputChange('about', 'title', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Descrição Principal
        </label>
        <textarea
          value={content.about.description}
          onChange={(e) => handleInputChange('about', 'description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Nossa Missão
        </label>
        <textarea
          value={content.about.mission}
          onChange={(e) => handleInputChange('about', 'mission', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Nossos Valores
        </label>
        <textarea
          value={content.about.values}
          onChange={(e) => handleInputChange('about', 'values', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>
    </div>
  );

  const renderFooterEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Descrição do Rodapé
        </label>
        <textarea
          value={content.footer.description}
          onChange={(e) => handleInputChange('footer', 'description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Copyright
        </label>
        <input
          type="text"
          value={content.footer.copyright}
          onChange={(e) => handleInputChange('footer', 'copyright', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'hero': return renderHeroEditor();
      case 'about': return renderAboutEditor();
      case 'footer': return renderFooterEditor();
      default: return renderHeroEditor();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Editor de Conteúdo</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
            Visualizar
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Seções</h3>
            <nav className="space-y-2">
              {contentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === section.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Edit3 className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-semibold text-white">
                {contentSections.find(s => s.id === activeTab)?.label}
              </h3>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;