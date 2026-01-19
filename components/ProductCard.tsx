import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { Plus, Minus, ShoppingBag, Box, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      productId: product.id,
      product,
      quantity: quantity
    });
    
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        setQuantity(1);
    }, 2000);
  };

  const updateQuantity = (val: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (val < 1) return;
    setQuantity(val);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="bg-white/90 backdrop-blur text-brand-navy text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                Ref: {product.reference}
            </span>
        </div>

        {/* Quick Add Overlay (Mobile Friendly Logic) */}
        <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-0'}`}>
           <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-md">
             {product.description}
           </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow relative">
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.15em]">{product.category}</span>
                {product.unitsPerBox > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                        <Box size={10} /> Cx: {product.unitsPerBox} un
                    </span>
                )}
            </div>
            
            <h3 className="font-serif text-lg text-gray-900 font-bold leading-tight mb-2 group-hover:text-brand-navy transition-colors">
                {product.name}
            </h3>

            <div className="flex flex-wrap gap-1 mb-4">
                {product.availableSizes.slice(0, 4).map(size => (
                    <span key={size} className="text-[10px] font-medium text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        {size}
                    </span>
                ))}
            </div>
        </div>

        {/* Pricing & Action */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
            <div>
                <span className="text-xs text-gray-400 block mb-0.5">Preço Unitário</span>
                <span className="text-xl font-serif font-bold text-brand-navy">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
            </div>

            {/* Smart Action Button */}
            <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 shadow-inner group-hover:border-brand-gold/30 transition-colors">
                {isAdded ? (
                     <div className="h-10 px-4 bg-green-500 text-white rounded-full flex items-center gap-2 text-sm font-bold shadow-md animate-scaleIn">
                        <Check size={16} /> <span className="hidden sm:inline">Add</span>
                     </div>
                ) : (
                    <>
                        <button 
                            onClick={(e) => updateQuantity(quantity - 1, e)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-navy hover:bg-white rounded-full transition-all"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-gray-700">{quantity}</span>
                        <button 
                            onClick={(e) => updateQuantity(quantity + 1, e)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-navy hover:bg-white rounded-full transition-all"
                        >
                            <Plus size={14} />
                        </button>
                        <button 
                            onClick={handleAdd}
                            className="ml-1 w-8 h-8 bg-brand-navy text-white rounded-full flex items-center justify-center hover:bg-brand-gold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        >
                            <ShoppingBag size={14} />
                        </button>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
