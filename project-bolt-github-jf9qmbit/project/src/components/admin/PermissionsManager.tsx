import React, { useState } from 'react';
import { Shield, User, Edit, Trash2, Plus, Save, X } from 'lucide-react';
import { User as UserType } from '../../types';

const PermissionsManager: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: 1,
      discord_id: '1382506667211493429',
      name: 'Owner Principal',
      email: 'owner@40sabores.com',
      role: 'owner',
      created_at: new Date('2024-01-01'),
      last_login: new Date()
    },
    {
      id: 2,
      discord_id: '123456789012345678',
      name: 'Admin Teste',
      email: 'admin@40sabores.com',
      role: 'admin',
      created_at: new Date('2024-01-15'),
      last_login: new Date()
    }
  ]);

  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState<Omit<UserType, 'id' | 'created_at' | 'last_login'>>({
    discord_id: '',
    name: '',
    email: '',
    role: 'viewer'
  });

  const roles = [
    { value: 'owner', label: 'Owner', color: 'bg-red-600', description: 'Acesso total ao sistema' },
    { value: 'admin', label: 'Admin', color: 'bg-orange-600', description: 'Gerenciamento completo exceto usuários' },
    { value: 'editor', label: 'Editor', color: 'bg-blue-600', description: 'Edição de conteúdo e uploads' },
    { value: 'moderator', label: 'Moderador', color: 'bg-green-600', description: 'Gerenciamento de staff e visualização' },
    { value: 'viewer', label: 'Visualizador', color: 'bg-gray-600', description: 'Apenas visualização' }
  ];

  const permissions = {
    owner: ['Todos os acessos', 'Gerenciar usuários', 'Configurações do sistema'],
    admin: ['Editar conteúdo', 'Gerenciar staff', 'Upload de assets', 'Configurações', 'Logs'],
    editor: ['Editar conteúdo', 'Upload de assets', 'Visualizar estatísticas'],
    moderator: ['Gerenciar staff', 'Visualizar conteúdo', 'Visualizar estatísticas'],
    viewer: ['Visualizar conteúdo', 'Visualizar staff', 'Visualizar estatísticas']
  };

  const handleEdit = (user: UserType) => {
    setEditingUser({ ...user });
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(prev => 
        prev.map(user => 
          user.id === editingUser.id ? editingUser : user
        )
      );
      setEditingUser(null);
    }
  };

  const handleDelete = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user?.role === 'owner') {
      alert('Não é possível excluir o owner principal!');
      return;
    }
    
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleAddUser = () => {
    if (newUser.discord_id && newUser.name) {
      const id = Math.max(...users.map(u => u.id)) + 1;
      setUsers(prev => [...prev, {
        ...newUser,
        id,
        created_at: new Date(),
        last_login: undefined
      }]);
      setNewUser({
        discord_id: '',
        name: '',
        email: '',
        role: 'viewer'
      });
      setShowAddForm(false);
    }
  };

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role) || roles[roles.length - 1];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Permissões & Usuários</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar Usuário
        </button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role.value} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
              <h3 className="text-lg font-semibold text-white">{role.label}</h3>
              <span className="text-sm text-gray-400">
                ({users.filter(u => u.role === role.value).length})
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{role.description}</p>
            <div className="space-y-1">
              {permissions[role.value as keyof typeof permissions]?.slice(0, 3).map((perm, index) => (
                <div key={index} className="flex items-center text-xs text-gray-400">
                  <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                  {perm}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Adicionar Novo Usuário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Discord ID *</label>
              <input
                type="text"
                value={newUser.discord_id}
                onChange={(e) => setNewUser(prev => ({ ...prev, discord_id: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="123456789012345678"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Nome *</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={newUser.email || ''}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Cargo</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as UserType['role'] }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Usuários do Sistema</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {users.map((user) => (
            <div key={user.id} className="p-6">
              {editingUser?.id === user.id ? (
                // Edit Form
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Nome</label>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={editingUser.email || ''}
                        onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Cargo</label>
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser(prev => prev ? { ...prev, role: e.target.value as UserType['role'] } : null)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        disabled={user.discord_id === '1382506667211493429'}
                      >
                        {roles.map(role => (
                          <option key={role.value} value={role.value}>{role.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="flex items-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-white">{user.name}</h4>
                        <span className={`px-3 py-1 ${getRoleInfo(user.role).color} text-white text-sm font-medium rounded-full`}>
                          {getRoleInfo(user.role).label}
                        </span>
                        {user.discord_id === '1382506667211493429' && (
                          <span className="px-2 py-1 bg-yellow-600 text-white text-xs font-medium rounded-full">
                            OWNER PRINCIPAL
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        Discord ID: {user.discord_id}
                      </p>
                      {user.email && (
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      )}
                      <p className="text-gray-500 text-xs">
                        Criado em: {user.created_at.toLocaleDateString('pt-BR')}
                        {user.last_login && ` • Último login: ${user.last_login.toLocaleDateString('pt-BR')}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      title="Editar usuário"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {user.discord_id !== '1382506667211493429' && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                        title="Excluir usuário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionsManager;