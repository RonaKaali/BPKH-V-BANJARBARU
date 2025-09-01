import { create } from 'zustand';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: 'success' | 'error') => void;
  removeToast: (id: number) => void;
}

let nextId = 0;

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type) =>
    set((state) => ({ toasts: [...state.toasts, { id: nextId++, message, type }] })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
