import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Lock, SlidersHorizontal } from 'lucide-react';
import { Product, CartItem } from './types';
import { fetchProducts } from './services/productService';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminDrawer } from './components/AdminDrawer';
import { BulkUploadModal } from './components/BulkUploadModal';
import { SeedCatalogButton } from './components/SeedCatalogButton';
import { Toast } from './components/Toast';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
      setToast({ message: 'Erro ao carregar catálogo', type: 'error' });
    }
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      // Verifica se já existe o mesmo produto (mesmo ID)
      // Nota: Simplifiquei para focar no ID do produto, mas você pode expandir para tamanho/cor se necessário
      const existing = prev.find(item => item.product.id === product.id);
      
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { productId: product.id, product, quantity }];
    });
    setToast({ message: 'Adicionado ao carrinho!', type: 'success' });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i === index) return { ...item, quantity: Math.max(0, newQty) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(term) || p.reference.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedCategory('Todos'); setSearchTerm('');}}>
              <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                <span className="text-brand-gold font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-brand-navy hidden sm:block">Sea Surf</h1>
            </div>

            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <Lock size={20} />
              </button>

              <button 
                className="relative p-2 text-brand-navy hover:bg-gray-100 rounded-full"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-hide">
             <SlidersHorizontal size={16} className="text-gray-400 mr-2 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === cat ? 'bg-brand-navy text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={(item) => handleAddToCart(item.product, item.quantity)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">Catálogo Vazio ou Carregando...</h3>
             <div className="mt-8 max-w-xs mx-auto">
                <SeedCatalogButton />
             </div>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateCartQuantity}
      />

      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onOpenBulkUpload={() => {
          setIsAdminOpen(false);
          setIsBulkUploadOpen(true);
        }}
      />

      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        products={products}
        onSuccess={() => {
          loadProducts();
          setToast({ message: 'Catálogo atualizado!', type: 'success' });
        }}
      />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;
