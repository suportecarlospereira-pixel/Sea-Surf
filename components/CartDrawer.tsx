import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Send, Copy, Check, User } from 'lucide-react';
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
  const [customerName, setCustomerName] = useState('');
  const [showNameError, setShowNameError] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Calcula o valor total estimado
  const totalValue = items.reduce((acc, item) => {
    const unitPrice = item.product.price;
    const units = item.product.unitsPerBox > 0 ? item.quantity * item.product.unitsPerBox : item.quantity;
    return acc + (unitPrice * units);
  }, 0);

  const generateMessage = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    
    // Header Limpo
    let message = `*PEDIDO OFICIAL - SEA SURF*\n`;
    message += `Data: ${dateStr}\n`;
    message += `Cliente: *${customerName.toUpperCase()}*\n`;
    message += `----------------------------------\n\n`;

    // Itens
    items.forEach((item, index) => {
      const units = item.product.unitsPerBox > 0 
        ? item.quantity * item.product.unitsPerBox 
        : item.quantity;
        
      const type = item.product.unitsPerBox > 0 ? "Caixas" : "Pecas";
      const totalItemVal = item.product.price * units;

      message += `*#${index + 1} - ${item.product.name}*\n`;
      message += `Ref: ${item.product.reference}\n`;
      message += `Qtd: ${item.quantity} ${type} (${units} un.)\n`;
      
      if (item.product.price > 0) {
        message += `Valor Est.: R$ ${totalItemVal.toFixed(2).replace('.', ',')}\n`;
      }
      message += `\n`;
    });

    // Resumo
    message += `----------------------------------\n`;
    message += `*RESUMO DO PEDIDO*\n`;
    message += `Volumes Totais: ${totalItems}\n`;
    if (totalValue > 0) {
        message += `Valor Total Estimado: R$ ${totalValue.toFixed(2).replace('.', ',')}\n`;
    }
    message += `\nAguardo confirmacao de disponibilidade.\n`;

    return message;
  };

  const handleCheckout = () => {
    if (!customerName.trim()) {
        setShowNameError(true);
        return;
    }
    
    const message = generateMessage();
    // Número alvo fixo ou configurável
    const phoneNumber = "5547999999999"; 
    
    // Encode simples para garantir compatibilidade
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  const handleCopyText = () => {
    if (!customerName.trim()) {
        setShowNameError(true);
        return;
    }
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
            <div>
                <span className="font-bold text-lg block leading-none">Seu Pedido</span>
                <span className="text-[10px] text-brand-gold opacity-80 uppercase tracking-widest">Revisão Final</span>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Client Identification */}
        {items.length > 0 && (
            <div className="bg-brand-navy/5 p-4 border-b border-brand-navy/10">
                <label className="text-xs font-bold text-brand-navy uppercase mb-1 block flex items-center gap-1">
                    <User size={12} /> Nome do Cliente / Loja
                </label>
                <input 
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                        setCustomerName(e.target.value);
                        if(e.target.value) setShowNameError(false);
                    }}
                    placeholder="Digite seu nome ou da loja..."
                    className={`w-full p-2 rounded-lg border text-sm outline-none focus:ring-1 focus:ring-brand-navy ${showNameError ? 'border-red-400 bg-red-50 placeholder-red-300' : 'border-gray-300 bg-white'}`}
                />
                {showNameError && <p className="text-[10px] text-red-500 font-bold mt-1">* Identificação obrigatória para o pedido.</p>}
            </div>
        )}

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
              <div key={`${item.productId}-${index}`} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 animate-fadeIn">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-800 truncate pr-2">{item.product.name}</h4>
                    <button onClick={() => onRemoveItem(index)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-2 font-mono bg-gray-50 inline-block px-1 rounded">Ref: {item.product.reference}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-brand-navy font-bold hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-brand-navy font-bold hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] text-gray-400 block uppercase font-bold">{item.product.unitsPerBox > 0 ? 'Caixas' : 'Peças'}</span>
                       {item.product.price > 0 && (
                           <span className="font-bold text-brand-navy text-sm">
                               R$ {(item.product.price * item.quantity * (item.product.unitsPerBox || 1)).toFixed(2)}
                           </span>
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
          <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            
            <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-500">Volumes Totais:</span>
                <span className="font-bold text-brand-navy">{totalItems} {items.some(i => i.product.unitsPerBox > 0) ? 'Caixas' : 'Peças'}</span>
            </div>
            
            {totalValue > 0 && (
                 <div className="flex justify-between mb-4 text-lg">
                    <span className="text-gray-800 font-bold">Total Estimado:</span>
                    <span className="font-bold text-brand-navy">R$ {totalValue.toFixed(2).replace('.', ',')}</span>
                </div>
            )}

            <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={handleCopyText}
                  className="col-span-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center transition-colors"
                  title="Copiar pedido"
                >
                  {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                </button>
                
                <button 
                  onClick={handleCheckout}
                  className="col-span-3 bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send size={18} />
                  Enviar Pedido
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
