import ToastContainerWrapper from "./component/common/ToastContainerWrapper";
import { useTheme } from "./context/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";


function App() {
  const {dark}=useTheme()

  return (
    <div className={dark?"bg-gray-600 text-white":""}>
      <AppRoutes />
     <ToastContainerWrapper/>
    </div>
  );
}

export default App;
