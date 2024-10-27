import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
