import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { Plus, Minus, Check, Box, Hash } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      product,
      quantity: quantity
    });
    
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        setQuantity(1); // Reset to 1 after adding
    }, 1500);
  };

  const updateQuantity = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group flex flex-col h-full border border-gray-100">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-brand-navy text-white text-xs px-2 py-1 uppercase tracking-wider font-semibold">
          {product.reference}
        </div>
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-brand-navy text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm border border-gray-100">
          Venda: Caixa Fechada
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs text-brand-gold uppercase tracking-widest font-bold">{product.category}</span>
          <h3 className="font-serif text-lg text-brand-navy font-semibold leading-tight mt-1">{product.name}</h3>
        </div>
        
        {/* Info Grid for Box Content */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600 mb-4 space-y-2">
            <p className="font-bold text-brand-navy uppercase text-[10px] tracking-wide mb-1 flex items-center gap-1">
                <Box size={12} /> Conteúdo da Caixa:
            </p>
            <div className="flex justify-between items-center bg-brand-navy/5 p-2 rounded border border-brand-navy/10">
                <span className="font-bold text-brand-navy flex items-center gap-1">
                    <Hash size={12} /> Quantidade:
                </span> 
                <span className={`font-bold ${product.unitsPerBox > 0 ? 'text-brand-navy' : 'text-gray-400 italic'}`}>
                  {product.unitsPerBox > 0 ? `${product.unitsPerBox} peças` : 'A informar'}
                </span>
            </div>
            <div className="flex gap-2 px-1">
                <span className="font-semibold">Grade:</span> 
                <span>{product.availableSizes.join(', ')}</span>
            </div>
            <div className="flex gap-2 px-1">
                <span className="font-semibold">Cores:</span> 
                <span>{product.availableColors.join(', ')}</span>
            </div>
        </div>
        
        <div className="space-y-3 mt-auto">
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-xs text-gray-400 block">Preço Unitário</span>
                    <span className="text-lg font-bold text-brand-navy">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button 
                        onClick={() => updateQuantity(quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-gray-500"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-brand-navy">{quantity}</span>
                    <button 
                        onClick={() => updateQuantity(quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-gray-500"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>
            
            <button 
              onClick={handleAdd}
              disabled={isAdded}
              className={`
                w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm
                ${isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-brand-navy text-white hover:bg-brand-gold'
                }
              `}
            >
              {isAdded ? (
                <>
                  <Check size={18} /> Adicionado!
                </>
              ) : (
                <>
                  <Plus size={18} /> Adicionar {quantity} Caixa{quantity > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};