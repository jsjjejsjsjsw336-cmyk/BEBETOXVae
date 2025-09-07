import React, { useState } from 'react';
import { MessageCircle, Settings, RefreshCw, CheckCircle, AlertCircle, Bot } from 'lucide-react';
import { useDiscordStats } from '../../hooks/useDiscordStats';

const DiscordIntegration: React.FC = () => {
  const { stats, loading, refreshStats } = useDiscordStats();
  const [botStatus, setBotStatus] = useState({
    online: true,
    lastPing: new Date(),
    commands: 24,
    guilds: 1
  });

  const [settings, setSettings] = useState({
    autoSync: true,
    syncInterval: 300, // 5 minutes
    logChannel: '1234567890123456789',
    welcomeChannel: '1234567890123456789',
    rulesChannel: '1234567890123456789'
  });

  const [testingConnection, setTestingConnection] = useState(false);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      // Simular teste de conexão
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Conexão testada com sucesso!');
    } catch (error) {
      alert('Erro ao testar conexão');
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações');
    }
  };

  const botCommands = [
    { name: '/stats', description: 'Mostra estatísticas do servidor', usage: 156 },
    { name: '/welcome', description: 'Configura mensagem de boas-vindas', usage: 23 },
    { name: '/roles', description: 'Gerencia cargos automáticos', usage: 89 },
    { name: '/moderation', description: 'Comandos de moderação', usage: 45 },
    { name: '/events', description: 'Gerencia eventos da comunidade', usage: 67 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Integração Discord</h2>
        <div className="flex gap-3">
          <button
            onClick={handleTestConnection}
            disabled={testingConnection}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <MessageCircle className="w-4 h-4" />
            {testingConnection ? 'Testando...' : 'Testar Conexão'}
          </button>
          <button
            onClick={refreshStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Sincronizar
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Status do Bot</p>
              <p className="text-lg font-bold text-white flex items-center gap-2">
                {botStatus.online ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Online
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Offline
                  </>
                )}
              </p>
            </div>
            <Bot className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Membros Online</p>
              <p className="text-2xl font-bold text-white">
                {loading ? '...' : stats.members_online}
              </p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Comandos Executados</p>
              <p className="text-2xl font-bold text-white">{botCommands.reduce((acc, cmd) => acc + cmd.usage, 0)}</p>
            </div>
            <span className="text-2xl">⚡</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Último Ping</p>
              <p className="text-lg font-bold text-white">
                {botStatus.lastPing.toLocaleTimeString('pt-BR')}
              </p>
            </div>
            <span className="text-2xl">📡</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Commands */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Comandos do Bot
          </h3>
          
          <div className="space-y-3">
            {botCommands.map((command, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{command.name}</h4>
                  <p className="text-gray-400 text-sm">{command.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{command.usage}</p>
                  <p className="text-gray-400 text-xs">usos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <input
                  type="checkbox"
                  checked={settings.autoSync}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoSync: e.target.checked }))}
                  className="rounded border-gray-600 text-red-600 focus:ring-red-500"
                />
                Sincronização Automática
              </label>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Intervalo de Sincronização (segundos)
              </label>
              <input
                type="number"
                value={settings.syncInterval}
                onChange={(e) => setSettings(prev => ({ ...prev, syncInterval: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                min="60"
                max="3600"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Canal de Logs
              </label>
              <input
                type="text"
                value={settings.logChannel}
                onChange={(e) => setSettings(prev => ({ ...prev, logChannel: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ID do canal"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Canal de Boas-vindas
              </label>
              <input
                type="text"
                value={settings.welcomeChannel}
                onChange={(e) => setSettings(prev => ({ ...prev, welcomeChannel: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ID do canal"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Canal de Regras
              </label>
              <input
                type="text"
                value={settings.rulesChannel}
                onChange={(e) => setSettings(prev => ({ ...prev, rulesChannel: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ID do canal"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Atividade Recente do Discord</h3>
        
        <div className="space-y-3">
          {[
            { action: 'Novo membro entrou', user: 'Usuario123', time: '2 min atrás', type: 'join' },
            { action: 'Mensagem moderada', user: 'ModeradorBot', time: '15 min atrás', type: 'moderation' },
            { action: 'Evento criado', user: 'EventManager', time: '1 hora atrás', type: 'event' },
            { action: 'Cargo atribuído', user: 'AutoRole', time: '2 horas atrás', type: 'role' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'join' ? 'bg-green-400' :
                  activity.type === 'moderation' ? 'bg-red-400' :
                  activity.type === 'event' ? 'bg-blue-400' : 'bg-yellow-400'
                }`}></div>
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">por {activity.user}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscordIntegration;