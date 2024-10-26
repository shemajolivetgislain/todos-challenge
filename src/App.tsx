import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      {/* <Analytics /> */}
      <ToastContainer autoClose={1000} closeOnClick />
      <AppRoutes />
      {/* <ScrollToTop /> */}
    </BrowserRouter>
  );
}

export default App;
