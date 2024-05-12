// components/Toaster.tsx
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster: React.FC = () => {
  return (
    <ToastContainer   position="top-center"/>
  );
};

export const showToast = (message: string) => {
  toast.success(message);
};
export const showToastError = (message: string) => {
    toast.error(message);
  };

export default Toaster;
