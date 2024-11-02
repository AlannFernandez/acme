import { toast, Toaster } from "sonner";
import {
  CheckIcon,
  InformationCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

interface PromiseToastMessages<TData, TError> {
  loading: string;
  success: string | ((data: TData) => string);
  error: string | ((error: TError) => string);
}

const defaultOptions: ToastOptions = {
  duration: 2000,
  position: "bottom-right",
};

export const ToastContainer = () => {
  return (
    <Toaster
      position={defaultOptions.position}
      expand={false}
      richColors
      closeButton={false}
    />
  );
};

const icons = {
  success: <CheckIcon />,
  error: <XCircleIcon />,
  info: <InformationCircleIcon />,
  warning: <ExclamationCircleIcon />,
};

export const showToast = (
  message: string,
  type: ToastType = "info",
  options: ToastOptions = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };

  const toastConfig = {
    duration: mergedOptions.duration,
    icon: icons[type],
    className: `${type}-toast`,
    // style: {
    //   background: 'white',
    //   border: '1px solid',
    //   borderColor: type === 'success' ? '#22c55e' :
    //               type === 'error' ? '#ef4444' :
    //               type === 'warning' ? '#eab308' :
    //               '#3b82f6'
    // }
  };

  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    case "warning":
      toast.warning(message, toastConfig);
      break;
    case "info":
    default:
      toast.info(message, toastConfig);
      break;
  }
};

export const showPromiseToast = <TData, TError = Error>(
    promise: Promise<TData>,
    messages: PromiseToastMessages<TData, TError>,
    options: ToastOptions = {}
) => {
    
  const mergedOptions = { ...defaultOptions, ...options };

  return toast.promise(promise, {
    ...messages,
    duration: mergedOptions.duration,
    className: "promise-toast",
    // style: {
    //   background: "white",
    //   border: "1px solid",
    //   borderColor: "#3b82f6",
    // },
  });
};
