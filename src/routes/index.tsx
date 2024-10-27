import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<h1>Home</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
