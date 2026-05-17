import { useEffect } from "react";
import ToastContainerWrapper from "./component/common/ToastContainerWrapper";
import { useTheme } from "./context/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/userSlice";
import useAxiosInterceptor from "./api/useAxiosInterceptor";


function App() {
  const {dark}=useTheme()
  const dispatch = useDispatch();
  useAxiosInterceptor();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <div className={dark?"bg-gray-600 text-white":""}>
      <AppRoutes />
     <ToastContainerWrapper/>
    </div>
  );
}

export default App;
