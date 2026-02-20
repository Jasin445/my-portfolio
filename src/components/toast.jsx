import { useEffect, useState } from "react";
import Icon from "./AppIcon";

// Toast types: 'success' | 'error' | 'loading'
const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Enter
    setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss (not for loading)
    if (type !== "loading" && duration) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose?.(), 300);
  };

  const config = {
    success: {
      icon: "CheckCircle2",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      bgAccent: "bg-emerald-500/10",
      bar: "bg-emerald-400",
    },
    error: {
      icon: "XCircle",
      iconColor: "text-red-400",
      borderColor: "border-red-500/20",
      bgAccent: "bg-red-500/10",
      bar: "bg-red-400",
    },
    loading: {
      icon: null,
      iconColor: "",
      borderColor: "border-primary/20",
      bgAccent: "bg-primary/10",
      bar: "bg-primary",
    },
  };

  const { icon, iconColor, borderColor, bgAccent, bar } = config[type];

  return (
    <div
      className={`relative flex items-start gap-3 w-full max-w-sm
        bg-[#1e2a30] border ${borderColor} rounded-2xl px-4 py-3.5 shadow-2xl
        transition-all duration-300 overflow-hidden
        ${isVisible && !isLeaving ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${bar} rounded-l-2xl`} />

      {/* Icon */}
      <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full ${bgAccent} flex items-center justify-center`}>
        {type === "loading" ? (
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        ) : (
          <Icon name={icon} size={15} className={iconColor} />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-medium text-foreground leading-snug">
          {message}
        </p>
      </div>

      {/* Close button (not shown for loading) */}
      {type !== "loading" && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 mt-0.5 text-foreground/30 hover:text-foreground/60 transition-colors duration-200"
        >
          <Icon name="X" size={14} />
        </button>
      )}

      {/* Progress bar (success/error only) */}
      {type !== "loading" && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <div
            className={`h-full ${bar} opacity-40`}
            style={{
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
};


export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
