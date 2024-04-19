import { createContext, useContext, ReactNode } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextProps {
  toastSuccess: (message: string, options?: ToastOptions) => void;
  toastError: (message: string, options?: ToastOptions) => void;
  toastWarning: (message: string, options?: ToastOptions) => void;
  toastInfo: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const showToast = (message: string, options?: ToastOptions) => toast(message, options);

  const toastSuccess = (message: string, options?: ToastOptions) =>
    showToast(message, { ...options, type: "success" });
  const toastError = (message: string, options?: ToastOptions) =>
    showToast(message, { ...options, type: "error" });
  const toastWarning = (message: string, options?: ToastOptions) =>
    showToast(message, { ...options, type: "warning" });
  const toastInfo = (message: string, options?: ToastOptions) =>
    showToast(message, { ...options, type: "info" });

  return (
    <ToastContext.Provider value={{ toastSuccess, toastError, toastWarning, toastInfo }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
