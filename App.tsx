import React, { useState, useMemo, useEffect } from 'react';
import { CartItem, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminDrawer } from './components/AdminDrawer';
import { AIAssistant } from './components/AIAssistant';
import { ShoppingBag, Search, Settings, Loader2 } from 'lucide-react';
import { fetchProducts } from './services/productService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Carregar dados do Firebase na inicialização
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Update categories dynamically based on current products
  const currentCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Todos', ...Array.from(cats).sort()];
  }, [products]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: newQuantity } : item));
  };

  // Callbacks para AdminDrawer
  const handleAddProduct = (newProduct: Product) => {
      setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setCartItems(prev => prev.map(item => 
        item.productId === updatedProduct.id ? { ...item, product: updatedProduct } : item
      ));
  };

  const handleDeleteProduct = (productId: string) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      alert("Produto removido com sucesso.");
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
      // Atualização visual otimista
      const updatedProducts = products.map(p => 
          p.category === oldName ? { ...p, category: newName.trim() } : p
      );
      setProducts(updatedProducts);
      if (selectedCategory === oldName) setSelectedCategory(newName.trim());
      // Nota: A persistência real exigiria um batch update no Firestore, 
      // mas para UX imediata isso resolve, o usuário deve editar os produtos para salvar definitivamente se der refresh.
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.reference.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-gray-800 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-gold/10 transition-all">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
             <div className="w-10 h-10 bg-brand-navy text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
               SS
             </div>
             <div>
               <h1 className="font-serif text-xl md:text-2xl font-bold text-brand-navy tracking-tight leading-none">Sea Surf</h1>
               <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Representações</span>
             </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-colors"
                  title="Acesso Administrativo"
                >
                  <Settings size={20} />
                </button>

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-brand-navy hover:bg-gray-100 rounded-full transition-colors group"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transform group-hover:scale-110 transition-transform">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Coleção Inverno 2026</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Estilo que define <br className="hidden md:block"/>a sua essência.
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8 font-light text-lg">
            Peças exclusivas Sea Surf selecionadas para representantes que valorizam qualidade, corte e sofisticação.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="sticky top-20 z-20 bg-[#F9F9F7]/95 backdrop-blur px-4 py-4 border-b border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou referência..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy bg-white text-sm outline-none transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <button 
                onClick={() => setSelectedCategory('Todos')}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'Todos' 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-navy'
                }`}
              >
                Todos
            </button>
            {currentCategories.filter(c => c !== 'Todos').map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 className="w-10 h-10 animate-spin text-brand-navy" />
             <p className="text-gray-500 font-medium">Carregando catálogo...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('Todos');}}
              className="mt-4 text-brand-navy underline font-medium"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* IA Assistant */}
      <AIAssistant products={products} />

      {/* Drawers */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <AdminDrawer 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onRenameCategory={handleRenameCategory}
      />
    </div>
  );
};

export default App;
