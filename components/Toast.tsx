import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Fecha automaticamente após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-brand-navy text-white border border-brand-gold shadow-brand-gold/20',
    error: 'bg-red-50 text-red-800 border border-red-200 shadow-red-500/10'
  };

  const icons = {
    success: <Check size={20} className="text-brand-gold" />,
    error: <AlertCircle size={20} className="text-red-600" />
  };

  return (
    <div className={`fixed top-4 right-4 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-slideDown ${styles[type]}`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="font-medium text-sm pr-2">{message}</p>
      <button 
        onClick={onClose}
        className="opacity-60 hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
  );
};
