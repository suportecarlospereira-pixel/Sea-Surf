import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Send, Copy, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onUpdateQuantity 
}) => {
  const [copied, setCopied] = useState(false);

  // Calcula o total de caixas/peças
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Gera o texto formatado para o WhatsApp
  const generateMessage = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let message = `*PEDIDO SEA SURF* 🌊\n`;
    message += `📅 Data: ${dateStr} às ${timeStr}\n`;
    message += `--------------------------------\n\n`;

    items.forEach((item, index) => {
      const totalItemPrice = item.quantity * item.product.price * item.product.unitsPerBox;
      const isBox = item.product.unitsPerBox > 0;
      
      message += `*ITEM ${index + 1}*\n`;
      message += `🧥 *Modelo:* ${item.product.name}\n`;
      message += `🏷️ *Ref:* ${item.product.reference}\n`;
      
      if (isBox) {
         message += `📦 *Qtd:* ${item.quantity} cx (aprox. ${item.quantity * item.product.unitsPerBox} peças)\n`;
      } else {
         message += `👕 *Qtd:* ${item.quantity} peças\n`;
      }
      
      // Se tiver preço definido
      if (item.product.price > 0) {
        message += `💲 *Unitário:* R$ ${item.product.price.toFixed(2).replace('.', ',')}\n`;
      } else {
        message += `💲 *Preço:* A consultar\n`;
      }
      
      message += `\n`;
    });

    message += `--------------------------------\n`;
    message += `📊 *RESUMO FINAL*\n`;
    message += `📦 Total de Volumes: ${totalItems}\n`;
    message += `📝 Aguardo confirmação de disponibilidade e frete.\n`;

    return message;
  };

  const handleCheckout = () => {
    const message = generateMessage();
    const phoneNumber = "5547999999999"; // COLOQUE SEU NÚMERO AQUI (DDD + NUMERO)
    
    // encodeURIComponent é essencial para evitar caracteres estranhos e quebras de link
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  const handleCopyText = () => {
    const message = generateMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-brand-navy p-5 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-gold" />
            <span className="font-bold text-lg">Seu Pedido</span>
            <span className="bg-brand-gold text-brand-navy text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p>Seu carrinho está vazio.</p>
              <button onClick={onClose} className="text-brand-navy font-bold underline">
                Voltar ao catálogo
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 animate-fadeIn">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.product.name}</h4>
                    <button onClick={() => onRemoveItem(index)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Ref: {item.product.reference}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-brand-navy font-bold hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-brand-navy font-bold hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                       <span className="text-xs text-gray-400 block">{item.product.unitsPerBox > 0 ? 'Caixas' : 'Peças'}</span>
                       {item.product.price > 0 && (
                           <span className="font-bold text-brand-navy">R$ {(item.product.price * item.quantity * (item.product.unitsPerBox || 1)).toFixed(2)}</span>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer com Ações */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-gray-100 shadow-lg">
            
            <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-500">Total de Volumes:</span>
                <span className="font-bold text-brand-navy">{totalItems} {items.some(i => i.product.unitsPerBox > 0) ? 'Caixas' : 'Peças'}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={handleCopyText}
                  className="col-span-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center transition-colors"
                  title="Copiar texto do pedido"
                >
                  {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                </button>
                
                <button 
                  onClick={handleCheckout}
                  className="col-span-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02]"
                >
                  <Send size={20} />
                  Enviar no WhatsApp
                </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-3">
              O pedido será montado no WhatsApp para envio.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
