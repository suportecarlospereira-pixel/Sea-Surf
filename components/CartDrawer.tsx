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

// AQUI ESTÁ A CORREÇÃO: "items = []" garante que nunca seja undefined
export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items = [], 
  onRemoveItem,
  onUpdateQuantity 
}) => {
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [showNameError, setShowNameError] = useState(false);

  // Segunda camada de proteção
  const safeItems = Array.isArray(items) ? items : [];

  const totalItems = safeItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalValue = safeItems.reduce((acc, item) => {
    const unitPrice = item.product.price;
    const units = item.product.unitsPerBox > 0 ? item.quantity * item.product.unitsPerBox : item.quantity;
    return acc + (unitPrice * units);
  }, 0);

  const generateMessage = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    let message = `*PEDIDO OFICIAL - SEA SURF*\nData: ${dateStr}\nCliente: *${customerName.toUpperCase()}*\n----------------------------------\n\n`;

    safeItems.forEach((item, index) => {
      const units = item.product.unitsPerBox > 0 ? item.quantity * item.product.unitsPerBox : item.quantity;
      const type = item.product.unitsPerBox > 0 ? "Caixas" : "Pecas";
      const totalItemVal = item.product.price * units;

      message += `*#${index + 1} - ${item.product.name}*\nRef: ${item.product.reference}\nQtd: ${item.quantity} ${type} (${units} un.)\n`;
      if (item.product.price > 0) message += `Valor Est.: R$ ${totalItemVal.toFixed(2).replace('.', ',')}\n`;
      message += `\n`;
    });

    message += `----------------------------------\n*RESUMO DO PEDIDO*\nVolumes Totais: ${totalItems}\n`;
    if (totalValue > 0) message += `Valor Total Estimado: R$ ${totalValue.toFixed(2).replace('.', ',')}\n`;
    message += `\nAguardo confirmacao de disponibilidade.\n`;
    return message;
  };

  const handleCheckout = () => {
    if (!customerName.trim()) { setShowNameError(true); return; }
    const message = generateMessage();
    const phoneNumber = "5547999999999"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopyText = () => {
    if (!customerName.trim()) { setShowNameError(true); return; }
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-brand-navy p-5 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-gold" />
            <div><span className="font-bold text-lg block leading-none">Seu Pedido</span><span className="text-[10px] text-brand-gold opacity-80 uppercase tracking-widest">Revisão Final</span></div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full"><X size={24} /></button>
        </div>

        {safeItems.length > 0 && (
            <div className="bg-brand-navy/5 p-4 border-b border-brand-navy/10">
                <label className="text-xs font-bold text-brand-navy uppercase mb-1 block flex items-center gap-1"><User size={12} /> Nome do Cliente</label>
                <input type="text" value={customerName} onChange={(e) => { setCustomerName(e.target.value); if(e.target.value) setShowNameError(false); }} placeholder="Digite seu nome..." className={`w-full p-2 rounded-lg border text-sm outline-none focus:ring-1 focus:ring-brand-navy ${showNameError ? 'border-red-400 bg-red-50 placeholder-red-300' : 'border-gray-300 bg-white'}`} />
            </div>
        )}

        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {safeItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4"><ShoppingBag size={64} className="opacity-20" /><p>Carrinho vazio.</p></div>
          ) : (
            safeItems.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"><img src={item.product.imageUrl} className="w-full h-full object-cover" /></div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start"><h4 className="font-bold text-sm text-gray-800 truncate pr-2">{item.product.name}</h4><button onClick={() => onRemoveItem(index)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button></div>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                      <button onClick={() => onUpdateQuantity(index, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-brand-navy font-bold hover:bg-gray-50">-</button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(index, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-brand-navy font-bold hover:bg-gray-50">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {safeItems.length > 0 && (
          <div className="p-5 bg-white border-t border-gray-100 shadow-lg z-10 grid grid-cols-4 gap-2">
            <button onClick={handleCopyText} className="col-span-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center transition-colors">{copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}</button>
            <button onClick={handleCheckout} className="col-span-3 bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"><Send size={18} /> Enviar Pedido</button>
          </div>
        )}
      </div>
    </>
  );
};
