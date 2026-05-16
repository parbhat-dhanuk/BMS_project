import { ToastContainer } from "react-toastify";

const ToastContainerWrapper = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastContainerWrapper;
