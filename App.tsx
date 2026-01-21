import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Lock, SlidersHorizontal } from 'lucide-react';
import { Product, CartItem } from './types';
// CORREÇÃO AQUI: Mudamos de getProducts para fetchProducts
import { fetchProducts } from './services/productService';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminDrawer } from './components/AdminDrawer';
import { BulkUploadModal } from './components/BulkUploadModal';
import { SeedCatalogButton } from './components/SeedCatalogButton';
import { Toast } from './components/Toast';

function App() {
  // --- Estados Principais ---
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // --- Estados de Interface (Modais e Drawers) ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  
  // --- Estados de Filtro e Busca ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Carrega produtos ao iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // CORREÇÃO AQUI: Chamando a função correta fetchProducts()
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      showToast('Erro ao carregar catálogo.', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Lógica do Carrinho ---
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1, size, color }];
    });
    showToast('Produto adicionado ao carrinho!', 'success');
    setIsCartOpen(true); 
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === itemId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // --- Filtros ---
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.reference.toLowerCase().includes(searchTerm.toLowerCase());
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
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedCategory('Todos'); setSearchTerm('');}}>
              <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                <span className="text-brand-gold font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-brand-navy hidden sm:block tracking-tight">Sea Surf</h1>
            </div>

            {/* Barra de Busca Centralizada */}
            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Buscar por nome ou referência..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold bg-gray-50 group-hover:bg-white transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 group-hover:text-brand-gold transition-colors" size={20} />
              </div>
            </div>

            {/* Ações do Header (Direita) */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Search size={22} />
              </button>

              {/* Área Admin */}
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="p-2 text-gray-500 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-colors flex flex-col items-center justify-center"
                title="Administração"
              >
                <Lock size={20} />
              </button>

              {/* Carrinho */}
              <button 
                className="relative p-2 text-brand-navy hover:bg-gray-100 rounded-full transition-colors group"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-short">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Categorias (Scroll Horizontal) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-gray-100 sm:border-0 mt-2 sm:mt-0">
             <SlidersHorizontal size={16} className="text-gray-400 mr-2 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${selectedCategory === cat 
                    ? 'bg-brand-navy text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-navy hover:text-brand-navy'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        {/* Estado Vazio */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Search size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="text-gray-500 mt-1 max-w-md">
              Tente ajustar sua busca ou filtro. Se o banco estiver vazio, use o botão de Admin para popular.
            </p>
             <div className="mt-8">
                <SeedCatalogButton onSeed={loadProducts} />
             </div>
          </div>
        )}
      </main>

      {/* Footer Simples */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 Sea Surf. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* --- Componentes Globais e Modais --- */}
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
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
          showToast('Catálogo atualizado com sucesso!', 'success');
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
