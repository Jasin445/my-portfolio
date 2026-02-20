import { useState } from "react";


 const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = {
    success: (message) => addToast(message, "success", 4000),
    error: (message) => addToast(message, "error", 5000),
    loading: (message) => addToast(message, "loading", null),
  };

  return { toasts, toast, removeToast };
};

export default useToast;