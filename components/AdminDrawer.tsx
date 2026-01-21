import React from 'react';
import { X, Upload, Settings, Package } from 'lucide-react';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBulkUpload: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({ isOpen, onClose, onOpenBulkUpload }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Escuro */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer (Menu Lateral) */}
      <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-navy text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings size={20} /> Administração
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Corpo do Menu */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Gerenciamento</h3>
            
            {/* Botão de Upload em Massa */}
            <button 
              onClick={onOpenBulkUpload}
              className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-gold/10 hover:text-brand-navy rounded-xl border border-gray-100 transition-all group"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-brand-navy group-hover:scale-110 transition-transform">
                <Upload size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Upload em Massa</p>
                <p className="text-xs text-gray-500">Importar fotos e criar produtos</p>
              </div>
            </button>
          </div>

          {/* Área desativada para futuro */}
          <div className="opacity-50 pointer-events-none select-none grayscale">
             <button className="w-full flex items-center gap-3 p-3 text-gray-400 bg-gray-50 rounded-lg border border-transparent">
               <Package size={20} /> 
               <span className="text-sm">Gerenciar Estoque (Em breve)</span>
             </button>
          </div>

        </div>

        {/* Rodapé */}
        <div className="p-6 border-t border-gray-100">
           <p className="text-xs text-center text-gray-400">Versão 1.0.0 Sea Surf</p>
        </div>
      </div>
    </>
  );
};
