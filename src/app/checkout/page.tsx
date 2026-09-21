'use client';

import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.totalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success('¡Pago realizado con éxito!');
      
      // Redirect home after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 2000);
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <CheckCircle2 size={80} className="text-black mb-6" />
        <h1 className="text-3xl font-bold mb-4">Pago Realizado</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles del envío en breve.
        </p>
        <p className="text-sm font-medium text-gray-400">Redirigiendo al inicio...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">No hay nada que pagar</h1>
        <p className="text-gray-500 mb-8">Tu carrito está vacío.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Volver
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Formulario Simulado */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Datos de envío y pago</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Apellidos</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="Tus apellidos" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dirección</label>
              <input required type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="Calle, número, piso..." />
            </div>
            
            <hr className="my-6 border-gray-100" />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tarjeta de crédito (Simulación)</label>
              <input required type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors font-mono" placeholder="0000 0000 0000 0000" maxLength={19} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Caducidad</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="MM/AA" maxLength={5} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CVC</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition-colors" placeholder="123" maxLength={3} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full mt-8 bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Procesando...
                </>
              ) : (
                `Pagar ${totalPrice()} €`
              )}
            </button>
          </form>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-gray-50 p-8 rounded-2xl h-fit">
          <h2 className="text-xl font-semibold mb-6">Resumen del pedido</h2>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.model} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.model}</p>
                  <p className="text-xs text-gray-500">Talla: {item.size}</p>
                </div>
                <div className="font-medium text-sm">
                  {item.price} €
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{totalPrice()} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-200">
              <span>Total</span>
              <span>{totalPrice()} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
