import React, { useState } from 'react';
import { Upload, Image, Trash2, Download, Eye } from 'lucide-react';

interface Asset {
  id: number;
  filename: string;
  url: string;
  type: 'image' | 'icon' | 'banner';
  size: string;
  uploadedAt: Date;
}

const AssetManager: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      filename: 'logo-principal.jpg',
      url: 'https://images.pexels.com/photos/1666999/pexels-photo-1666999.jpeg?auto=compress&cs=tinysrgb&w=300',
      type: 'image',
      size: '245 KB',
      uploadedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      filename: 'banner-hero.jpg',
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'banner',
      size: '892 KB',
      uploadedAt: new Date('2024-01-20')
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    
    // Simular upload
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newAsset: Asset = {
        id: Date.now() + i,
        filename: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'icon',
        size: `${Math.round(file.size / 1024)} KB`,
        uploadedAt: new Date()
      };
      
      setAssets(prev => [...prev, newAsset]);
    }
    
    setUploading(false);
    event.target.value = '';
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este asset?')) {
      setAssets(prev => prev.filter(asset => asset.id !== id));
    }
  };

  const filteredAssets = selectedType === 'all' 
    ? assets 
    : assets.filter(asset => asset.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'banner': return '🎨';
      case 'icon': return '⭐';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-600';
      case 'banner': return 'bg-purple-600';
      case 'icon': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gerenciar Assets</h2>
        <div className="flex gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Todos os tipos</option>
            <option value="image">Imagens</option>
            <option value="banner">Banners</option>
            <option value="icon">Ícones</option>
          </select>
          
          <label className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? 'Enviando...' : 'Upload'}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Assets</p>
              <p className="text-2xl font-bold text-white">{assets.length}</p>
            </div>
            <Image className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Imagens</p>
              <p className="text-2xl font-bold text-white">
                {assets.filter(a => a.type === 'image').length}
              </p>
            </div>
            <span className="text-2xl">🖼️</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Banners</p>
              <p className="text-2xl font-bold text-white">
                {assets.filter(a => a.type === 'banner').length}
              </p>
            </div>
            <span className="text-2xl">🎨</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ícones</p>
              <p className="text-2xl font-bold text-white">
                {assets.filter(a => a.type === 'icon').length}
              </p>
            </div>
            <span className="text-2xl">⭐</span>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-600/50 transition-colors">
            <div className="aspect-video bg-gray-700 flex items-center justify-center relative group">
              <img
                src={asset.url}
                alt={asset.filename}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden flex items-center justify-center w-full h-full">
                <Image className="w-12 h-12 text-gray-500" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => window.open(asset.url, '_blank')}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Visualizar"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = asset.url;
                    link.download = asset.filename;
                    link.click();
                  }}
                  className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(asset.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getTypeIcon(asset.type)}</span>
                <span className={`px-2 py-1 ${getTypeColor(asset.type)} text-white text-xs font-medium rounded-full`}>
                  {asset.type}
                </span>
              </div>
              
              <h3 className="text-white font-medium mb-1 truncate" title={asset.filename}>
                {asset.filename}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{asset.size}</span>
                <span>{asset.uploadedAt.toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Nenhum asset encontrado
          </h3>
          <p className="text-gray-500">
            {selectedType === 'all' 
              ? 'Faça upload de alguns arquivos para começar'
              : `Nenhum asset do tipo "${selectedType}" encontrado`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AssetManager;