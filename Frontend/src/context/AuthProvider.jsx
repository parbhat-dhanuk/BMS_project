import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);
  const checkAuth = async () => {
    try {
      const response=await axiosInstance.post("/auth/me");
      setIsAuth(true);
      setUser(response.data.user)
    } catch (error) {
      setIsAuth(false);
    }
  };

   const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if(response.data.success){
        setIsAuth(false);
        setUser(null);
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.message);

    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, checkAuth ,user,logout}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};