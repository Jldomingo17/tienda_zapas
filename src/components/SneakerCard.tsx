'use client';

import { Sneaker } from '@/data/sneakers';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const inCart = items.some((item) => item.id === sneaker.id);

  const handleAddToCart = () => {
    if (inCart) {
      toast.error('Esta zapatilla ya está en tu carrito');
      return;
    }
    addItem(sneaker);
    toast.success(`${sneaker.model} añadida al carrito`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col gap-3"
    >
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-pointer">
        <img 
          src={sneaker.image} 
          alt={sneaker.model} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm">
          {sneaker.condition}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          EU {sneaker.size}
        </div>
        
        {/* Hover overlay add to cart */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button 
            onClick={handleAddToCart}
            disabled={mounted && inCart}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-xl transition-all active:scale-95 ${
              mounted && inCart 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-900 translate-y-4 group-hover:translate-y-0'
            }`}
          >
            <ShoppingBag size={18} />
            {mounted && inCart ? 'En el carrito' : 'Añadir'}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start pt-2">
        <div>
          <p className="text-xs text-gray-500 uppercase font-medium mb-1">{sneaker.brand}</p>
          <h3 className="font-semibold text-sm line-clamp-1">{sneaker.model}</h3>
        </div>
        <span className="font-bold whitespace-nowrap">{sneaker.price} €</span>
      </div>
    </motion.div>
  );
}
