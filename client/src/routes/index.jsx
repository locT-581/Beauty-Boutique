import { lazy } from "react";
import AdminLayout from "../components/Layouts/AdminLayout.jsx";
const Home = lazy(() => import("../components/Home/index.jsx"));

const publicRouter = [
  { path: "/home", element: Home, layout: null },
  { path: "*", element: () => <div>Page not found</div>, layout: null },
];

const privateRouter = [
  {
    path: "/product-management",
    element: () => <div>Admin</div>,
    layout: AdminLayout,
    title: "Quản lý sản phẩm",
  },
];

export { publicRouter, privateRouter };
