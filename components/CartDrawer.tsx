import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Send, ShoppingBag, Package, Plus, Minus, Hash } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }) => {
  
  const handleSendToWhatsApp = () => {
    if (items.length === 0) return;

    const totalBoxes = items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPieces = items.reduce((acc, i) => acc + (i.quantity * i.product.unitsPerBox), 0);
    const date = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let message = `*📦 RELATÓRIO DE PEDIDO - SEA SURF*\n`;
    message += `_Gerado em: ${date} às ${time}_\n`;
    message += `------------------------------------------\n\n`;
    message += `Olá! Gostaria de verificar a disponibilidade das seguintes peças para atacado:\n\n`;
    
    items.forEach((item, index) => {
      const hasUnits = item.product.unitsPerBox > 0;
      const itemTotalPieces = item.quantity * item.product.unitsPerBox;
      
      message += `*${index + 1}. [REF: ${item.product.reference}]*\n`;
      message += `🔹 *Modelo:* ${item.product.name}\n`;
      message += `📦 *Caixas:* ${item.quantity} un.\n`;
      if (hasUnits) {
        message += `👕 *Total de Peças:* ${itemTotalPieces} un. (${item.product.unitsPerBox} p/ caixa)\n`;
      }
      message += `💰 *Ref. Unitário:* R$ ${item.product.price.toFixed(2).replace('.', ',')}\n`;
      message += `------------------------------------------\n`;
    });

    message += `\n*📊 RESUMO GERAL*\n`;
    message += `🔸 Total de Caixas: *${totalBoxes}*\n`;
    if (totalPieces > 0) {
      message += `🔸 Total de Peças: *${totalPieces}*\n`;
    }
    message += `🔸 Status: _Aguardando Orçamento de Frete_\n\n`;
    message += `*Por favor, me informe o valor total e o prazo de entrega.*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-brand-navy text-white">
            <div className="flex items-center gap-3">
              <Package size={24} className="text-brand-gold" />
              <h2 className="font-serif text-xl font-semibold">Seu Pedido</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                <ShoppingBag size={64} className="mb-4 opacity-20" />
                <p className="font-medium text-lg">Seu carrinho está vazio</p>
                <p className="text-sm mt-2">Adicione caixas do catálogo para fazer um orçamento.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2 border border-brand-navy text-brand-navy rounded-full hover:bg-brand-navy hover:text-white transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-20 h-24 object-cover rounded-md border border-gray-200"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-400">{item.product.reference}</p>
                          <h4 className="font-serif text-brand-navy font-semibold text-sm">{item.product.name}</h4>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="mt-2 text-[10px] text-gray-500 bg-gray-50 p-2 rounded flex justify-between items-center border border-gray-100">
                        <span>Caixa Fechada: <strong className={item.product.unitsPerBox > 0 ? '' : 'text-gray-400 italic'}>{item.product.unitsPerBox > 0 ? `${item.product.unitsPerBox} peças` : 'A informar'}</strong></span>
                        <span className="text-brand-gold font-bold">Grade: {item.product.availableSizes.join(', ')}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                         <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
                             <button 
                                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                className="p-1 hover:bg-white rounded transition-colors text-gray-500"
                             >
                                <Minus size={14} />
                             </button>
                             <span className="w-8 text-center text-sm font-bold text-brand-navy">{item.quantity}</span>
                             <button 
                                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                className="p-1 hover:bg-white rounded transition-colors text-gray-500"
                             >
                                <Plus size={14} />
                             </button>
                         </div>
                         {item.product.unitsPerBox > 0 && (
                          <div className="text-right">
                              <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-tighter">Total do Item</span>
                              <span className="text-xs font-bold text-brand-navy flex items-center justify-end gap-1">
                                 <Hash size={10} /> {item.quantity * item.product.unitsPerBox} peças
                              </span>
                          </div>
                         )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total de Caixas</span>
                    <span className="text-lg font-serif font-bold text-brand-navy">
                        {items.reduce((acc, i) => acc + i.quantity, 0)}
                    </span>
                </div>
                {items.some(i => i.product.unitsPerBox > 0) && (
                  <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Total de Peças</span>
                      <span className="text-2xl font-serif font-bold text-brand-gold">
                          {items.reduce((acc, i) => acc + (i.quantity * i.product.unitsPerBox), 0)}
                      </span>
                  </div>
                )}
            </div>
            
            <button 
              onClick={handleSendToWhatsApp}
              disabled={items.length === 0}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg
                ${items.length === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-xl transform hover:-translate-y-1'
                }
              `}
            >
              <Send size={20} />
              Enviar Pedido para WhatsApp
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3 uppercase tracking-widest font-bold">
              Sea Surf • Qualidade em cada detalhe
            </p>
          </div>
        </div>
      </div>
    </>
  );
};