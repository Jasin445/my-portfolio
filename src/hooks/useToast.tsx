import { useState } from "react";

export type ToastType = "success" | "error" | "loading";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number | null;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (
    message: string,
    type: ToastType = "success",
    duration: number | null = 4000,
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = {
    success: (message: string) => addToast(message, "success", 4000),
    error: (message: string) => addToast(message, "error", 5000),
    loading: (message: string) => addToast(message, "loading", null),
  };

  return { toasts, toast, removeToast };
};

export default useToast;