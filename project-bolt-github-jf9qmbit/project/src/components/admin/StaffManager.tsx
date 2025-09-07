import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, User } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  showOnSite: boolean;
}

const StaffManager: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: 1,
      name: 'João Silva',
      role: 'Owner',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Fundador da comunidade 40 Sabores',
      showOnSite: true
    },
    {
      id: 2,
      name: 'Maria Santos',
      role: 'Admin',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Administradora responsável pela moderação',
      showOnSite: true
    }
  ]);

  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState<Omit<StaffMember, 'id'>>({
    name: '',
    role: '',
    avatar: '',
    bio: '',
    showOnSite: true
  });

  const handleEdit = (member: StaffMember) => {
    setEditingMember({ ...member });
  };

  const handleSaveEdit = () => {
    if (editingMember) {
      setStaffMembers(prev => 
        prev.map(member => 
          member.id === editingMember.id ? editingMember : member
        )
      );
      setEditingMember(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja remover este membro da equipe?')) {
      setStaffMembers(prev => prev.filter(member => member.id !== id));
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      const id = Math.max(...staffMembers.map(m => m.id)) + 1;
      setStaffMembers(prev => [...prev, { ...newMember, id }]);
      setNewMember({
        name: '',
        role: '',
        avatar: '',
        bio: '',
        showOnSite: true
      });
      setShowAddForm(false);
    }
  };

  const roleOptions = ['Owner', 'Admin', 'Moderador', 'Helper', 'Designer', 'Developer'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gerenciar Staff</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar Membro
        </button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Adicionar Novo Membro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Cargo</label>
              <select
                value={newMember.role}
                onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Selecione um cargo</option>
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">URL do Avatar</label>
              <input
                type="url"
                value={newMember.avatar}
                onChange={(e) => setNewMember(prev => ({ ...prev, avatar: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
              <textarea
                value={newMember.bio}
                onChange={(e) => setNewMember(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={newMember.showOnSite}
                onChange={(e) => setNewMember(prev => ({ ...prev, showOnSite: e.target.checked }))}
                className="rounded border-gray-600 text-red-600 focus:ring-red-500"
              />
              Mostrar no site
            </label>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddMember}
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

      {/* Staff Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((member) => (
          <div key={member.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            {editingMember?.id === member.id ? (
              // Edit Form
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={editingMember.avatar || 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={editingMember.name}
                    className="w-16 h-16 rounded-full border-2 border-red-600"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) => setEditingMember(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                
                <select
                  value={editingMember.role}
                  onChange={(e) => setEditingMember(prev => prev ? { ...prev, role: e.target.value } : null)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                
                <input
                  type="url"
                  value={editingMember.avatar}
                  onChange={(e) => setEditingMember(prev => prev ? { ...prev, avatar: e.target.value } : null)}
                  placeholder="URL do avatar"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                
                <textarea
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember(prev => prev ? { ...prev, bio: e.target.value } : null)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
                
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={editingMember.showOnSite}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, showOnSite: e.target.checked } : null)}
                    className="rounded border-gray-600 text-red-600 focus:ring-red-500"
                  />
                  Mostrar no site
                </label>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingMember(null)}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.avatar || 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={member.name}
                    className="w-16 h-16 rounded-full border-2 border-red-600"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                      {member.role}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${member.showOnSite ? 'text-green-400' : 'text-gray-500'}`}>
                    {member.showOnSite ? 'Visível no site' : 'Oculto do site'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManager;