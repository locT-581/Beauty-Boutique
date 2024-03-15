import { lazy } from "react";
import AdminLayout from "../components/Layouts/AdminLayout.jsx";
const Home = lazy(() => import("../components/Home/index.jsx"));
const ProductManagement = lazy(() =>
  import("../components/Pages/ProductManagement.jsx")
);
const BlogManagement = lazy(() =>
  import("../components/Pages/BlogManagement.jsx")
);
const EditPost = lazy(() => import("../components/Pages/EditPost.jsx"));
const EditProduct = lazy(() => import("../components/Pages/EditProduct"));
const publicRouter = [
  { path: "/trangchu", element: Home, layout: null },
  { path: "*", element: () => <div>Page not found</div>, layout: null },
];

const privateRouter = [
  {
    path: "/quanlysanpham",
    element: ProductManagement,
    layout: AdminLayout,
    title: "Quản lý sản phẩm",
  },
  {
    path: "/quanlybaiviet",
    element: BlogManagement,
    layout: AdminLayout,
    title: "Quản lý bài viết",
  },
  {
    path: "/quanlykhachhang",
    element: BlogManagement,
    layout: AdminLayout,
    title: "Quản lý khách hàng",
  },
  {
    path: "/quanlymagiamgia",
    element: BlogManagement,
    layout: AdminLayout,
    title: "Quản lý mã giảm giá",
  },
  {
    path: "/quanlythongke",
    element: BlogManagement,
    layout: AdminLayout,
    title: "Thống kê",
  },
  {
    path: "/chinhsuabaiviet/:id",
    element: EditPost,
    layout: AdminLayout,
  },
  {
    path: "/chinhsuasanpham/:id",
    element: EditProduct,
    layout: AdminLayout,
  },
];

export { publicRouter, privateRouter };
