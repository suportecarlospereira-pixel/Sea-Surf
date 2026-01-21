import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-brand-navy' : 'bg-red-600';
  const icon = type === 'success' ? <Check size={20} className="text-brand-gold" /> : <AlertCircle size={20} className="text-white" />;

  return (
    <div className={`fixed top-4 right-4 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white ${bgColor} animate-bounce-short`}>
      {icon}
      <p className="font-medium text-sm pr-2">{message}</p>
      <button onClick={onClose} className="opacity-70 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
};
