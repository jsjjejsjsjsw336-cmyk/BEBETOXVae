import React, { useState } from 'react';
import { Save, RefreshCw, Shield, Globe, Palette, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    site: {
      title: '40 Sabores - Comunidade Discord',
      description: 'A comunidade mais saborosa do Discord. Junte-se a mais de 1.200 membros para conversas, jogos e diversão!',
      keywords: 'Discord, comunidade, 40 Sabores, gaming, chat, Brasil',
      maintenanceMode: false,
      allowRegistration: true
    },
    appearance: {
      primaryColor: '#dc2626',
      secondaryColor: '#1f2937',
      darkMode: true,
      showSnowAnimation: true,
      customCSS: ''
    },
    security: {
      requireEmailVerification: false,
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      enableTwoFactor: false
    },
    integrations: {
      discordBotToken: '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••',
      discordGuildId: '1234567890123456789',
      analyticsId: 'GA-XXXXXXXXX',
      enableAnalytics: true
    }
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('site');

  const tabs = [
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'integrations', label: 'Integrações', icon: Database }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderSiteSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Título do Site
        </label>
        <input
          type="text"
          value={settings.site.title}
          onChange={(e) => handleInputChange('site', 'title', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Descrição
        </label>
        <textarea
          value={settings.site.description}
          onChange={(e) => handleInputChange('site', 'description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Palavras-chave (SEO)
        </label>
        <input
          type="text"
          value={settings.site.keywords}
          onChange={(e) => handleInputChange('site', 'keywords', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.site.maintenanceMode}
            onChange={(e) => handleInputChange('site', 'maintenanceMode', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Modo de Manutenção
        </label>

        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.site.allowRegistration}
            onChange={(e) => handleInputChange('site', 'allowRegistration', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Permitir Novos Registros
        </label>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Cor Primária
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-600"
            />
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Cor Secundária
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={settings.appearance.secondaryColor}
              onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
              className="w-12 h-10 rounded border border-gray-600"
            />
            <input
              type="text"
              value={settings.appearance.secondaryColor}
              onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.appearance.darkMode}
            onChange={(e) => handleInputChange('appearance', 'darkMode', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Modo Escuro
        </label>

        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.appearance.showSnowAnimation}
            onChange={(e) => handleInputChange('appearance', 'showSnowAnimation', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Animação de Neve
        </label>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          CSS Personalizado
        </label>
        <textarea
          value={settings.appearance.customCSS}
          onChange={(e) => handleInputChange('appearance', 'customCSS', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm resize-none"
          placeholder="/* Adicione seu CSS personalizado aqui */"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Timeout de Sessão (horas)
        </label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          min="1"
          max="168"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Máximo de Tentativas de Login
        </label>
        <input
          type="number"
          value={settings.security.maxLoginAttempts}
          onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          min="3"
          max="10"
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.security.requireEmailVerification}
            onChange={(e) => handleInputChange('security', 'requireEmailVerification', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Exigir Verificação de Email
        </label>

        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.security.enableTwoFactor}
            onChange={(e) => handleInputChange('security', 'enableTwoFactor', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Habilitar Autenticação de Dois Fatores
        </label>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Token do Bot Discord
        </label>
        <input
          type="password"
          value={settings.integrations.discordBotToken}
          onChange={(e) => handleInputChange('integrations', 'discordBotToken', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          ID do Servidor Discord
        </label>
        <input
          type="text"
          value={settings.integrations.discordGuildId}
          onChange={(e) => handleInputChange('integrations', 'discordGuildId', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Google Analytics ID
        </label>
        <input
          type="text"
          value={settings.integrations.analyticsId}
          onChange={(e) => handleInputChange('integrations', 'analyticsId', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="GA-XXXXXXXXX"
        />
      </div>

      <div>
        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            checked={settings.integrations.enableAnalytics}
            onChange={(e) => handleInputChange('integrations', 'enableAnalytics', e.target.checked)}
            className="rounded border-gray-600 text-red-600 focus:ring-red-500"
          />
          Habilitar Google Analytics
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'site': return renderSiteSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'security': return renderSecuritySettings();
      case 'integrations': return renderIntegrationsSettings();
      default: return renderSiteSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>
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
          {saving ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Categorias</h3>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">
              {tabs.find(t => t.id === activeTab)?.label}
            </h3>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;