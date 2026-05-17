import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";


const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
     
      (error) => {
        if (
          error.response?.status === 401 &&
          error.config?.url !== "/auth/me"
        ) {
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;