'use client';

import Link from 'next/link';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-2xl tracking-tighter uppercase">
              Novu.
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag size={20} />
              {mounted && items.length > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold">Tu Carrito</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {mounted && items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.model} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">{item.brand}</p>
                          <h3 className="font-semibold leading-tight mt-1">{item.model}</h3>
                          <p className="text-sm text-gray-500 mt-1">Talla: {item.size} | {item.condition}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">{item.price} €</span>
                          <button 
                            onClick={() => {
                              removeItem(item.id);
                              toast.success('Zapatilla eliminada del carrito');
                            }}
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {mounted && items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-medium text-gray-500">Total</span>
                    <span className="text-2xl font-bold">{totalPrice()} €</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition-colors active:scale-[0.98]"
                  >
                    Proceder al pago
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
