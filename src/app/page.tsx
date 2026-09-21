'use client';

import { useState } from 'react';
import { sneakers } from '@/data/sneakers';
import SneakerCard from '@/components/SneakerCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const BRANDS = ['Todas', 'Nike', 'Adidas', 'New Balance', 'Asics'];

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [sizeInput, setSizeInput] = useState('');
  
  const [appliedBrand, setAppliedBrand] = useState('Todas');
  const [appliedSize, setAppliedSize] = useState('');

  const filteredSneakers = sneakers.filter(s => {
    const matchBrand = appliedBrand === 'Todas' ? true : s.brand === appliedBrand;
    const matchSize = appliedSize === '' ? true : s.size.toString() === appliedSize;
    return matchBrand && matchSize;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedBrand(selectedBrand);
    setAppliedSize(sizeInput);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col mb-12 space-y-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selección Curada.</h1>
          <p className="text-gray-500">Zapatillas de segunda mano en excelente estado, verificadas y listas para una nueva vida.</p>
        </div>
        
        {/* Formulario de búsqueda/filtro */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-end gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Marca</label>
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
            >
              {BRANDS.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-48 space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Talla (EU)</label>
            <input 
              type="number"
              min="30"
              max="50"
              step="0.5"
              placeholder="Ej: 42"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
          >
            <Search size={18} />
            Buscar
          </button>
        </form>
      </div>

      {/* Resultados */}
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Mostrando {filteredSneakers.length} resultado{filteredSneakers.length !== 1 ? 's' : ''}</span>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        <AnimatePresence>
          {filteredSneakers.map(sneaker => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredSneakers.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
          <Search size={48} className="opacity-20 mb-4" />
          <p className="text-lg font-medium text-black">No se encontraron resultados</p>
          <p className="mt-1">Intenta ajustar los filtros de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
