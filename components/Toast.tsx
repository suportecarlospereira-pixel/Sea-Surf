import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  text: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: () => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const bgColors = {
    success: 'bg-brand-navy text-white border-brand-gold',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-white text-gray-800 border-gray-200'
  };

  const icons = {
    success: <Check size={18} className="text-brand-gold" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <div className="w-2 h-2 rounded-full bg-brand-navy" />
  };

  return (
    <div className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-2xl border-l-4 animate-slideDown ${bgColors[toast.type]} backdrop-blur-md`}>
      <div className="flex-shrink-0">{icons[toast.type]}</div>
      <p className="text-sm font-medium flex-grow">{toast.text}</p>
      <button onClick={onRemove} className="opacity-50 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
};
