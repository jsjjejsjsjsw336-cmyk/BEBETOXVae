import React, { useState } from 'react';
import { Activity, Filter, Download, Trash2, RefreshCw } from 'lucide-react';

interface AuditLog {
  id: number;
  user: string;
  action: string;
  resource: string;
  details: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'login' | 'system';
}

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: 1,
      user: 'Owner Principal',
      action: 'Editou conteúdo',
      resource: 'Seção Hero',
      details: 'Alterou título principal de "40 Sabores" para "40 Sabores - Comunidade"',
      timestamp: new Date('2024-01-20T10:30:00'),
      type: 'update'
    },
    {
      id: 2,
      user: 'Admin Teste',
      action: 'Adicionou membro',
      resource: 'Staff',
      details: 'Adicionou novo membro: João Silva (Moderador)',
      timestamp: new Date('2024-01-20T09:15:00'),
      type: 'create'
    },
    {
      id: 3,
      user: 'Sistema',
      action: 'Backup automático',
      resource: 'Banco de dados',
      details: 'Backup diário executado com sucesso',
      timestamp: new Date('2024-01-20T03:00:00'),
      type: 'system'
    },
    {
      id: 4,
      user: 'Owner Principal',
      action: 'Login realizado',
      resource: 'Sistema',
      details: 'Login via Discord OAuth',
      timestamp: new Date('2024-01-19T18:45:00'),
      type: 'login'
    },
    {
      id: 5,
      user: 'Admin Teste',
      action: 'Removeu asset',
      resource: 'Assets',
      details: 'Removeu imagem: old-banner.jpg',
      timestamp: new Date('2024-01-19T16:20:00'),
      type: 'delete'
    }
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const actionTypes = [
    { value: 'all', label: 'Todas as ações', color: 'bg-gray-600' },
    { value: 'create', label: 'Criação', color: 'bg-green-600' },
    { value: 'update', label: 'Atualização', color: 'bg-blue-600' },
    { value: 'delete', label: 'Exclusão', color: 'bg-red-600' },
    { value: 'login', label: 'Login', color: 'bg-purple-600' },
    { value: 'system', label: 'Sistema', color: 'bg-yellow-600' }
  ];

  const uniqueUsers = ['all', ...Array.from(new Set(logs.map(log => log.user)))];

  const filteredLogs = logs.filter(log => {
    const typeMatch = filterType === 'all' || log.type === filterType;
    const userMatch = filterUser === 'all' || log.user === filterUser;
    return typeMatch && userMatch;
  });

  const getActionColor = (type: string) => {
    const actionType = actionTypes.find(at => at.value === type);
    return actionType?.color || 'bg-gray-600';
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'login': return '🔐';
      case 'system': return '⚙️';
      default: return '📝';
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleExport = () => {
    const csvContent = [
      ['Data/Hora', 'Usuário', 'Ação', 'Recurso', 'Detalhes'],
      ...filteredLogs.map(log => [
        log.timestamp.toLocaleString('pt-BR'),
        log.user,
        log.action,
        log.resource,
        log.details
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearOldLogs = () => {
    if (confirm('Tem certeza que deseja limpar logs antigos (mais de 30 dias)?')) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      setLogs(prev => prev.filter(log => log.timestamp > thirtyDaysAgo));
      alert('Logs antigos removidos com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Logs de Auditoria</h2>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={handleClearOldLogs}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Limpar Antigos
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Logs</p>
              <p className="text-2xl font-bold text-white">{logs.length}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hoje</p>
              <p className="text-2xl font-bold text-white">
                {logs.filter(log => {
                  const today = new Date();
                  return log.timestamp.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Usuários Ativos</p>
              <p className="text-2xl font-bold text-white">
                {uniqueUsers.length - 1}
              </p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ações Críticas</p>
              <p className="text-2xl font-bold text-white">
                {logs.filter(log => log.type === 'delete').length}
              </p>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-4 flex-1">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Tipo de Ação</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {actionTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Usuário</label>
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Todos os usuários</option>
                {uniqueUsers.slice(1).map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            {filteredLogs.length} de {logs.length} logs
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${getActionColor(log.type)} rounded-full flex items-center justify-center text-white text-sm`}>
                    {getActionIcon(log.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium">{log.action}</h4>
                    <span className={`px-2 py-1 ${getActionColor(log.type)} text-white text-xs font-medium rounded-full`}>
                      {actionTypes.find(at => at.value === log.type)?.label}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-1">
                    <span className="font-medium">{log.user}</span> • {log.resource}
                  </p>
                  
                  <p className="text-gray-400 text-sm mb-2">{log.details}</p>
                  
                  <p className="text-gray-500 text-xs">
                    {log.timestamp.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="p-8 text-center">
            <Activity className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              Nenhum log encontrado
            </h3>
            <p className="text-gray-500">
              Ajuste os filtros para ver mais resultados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;