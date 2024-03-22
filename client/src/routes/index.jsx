import { lazy } from "react";
import AdminLayout from "../components/Layouts/AdminLayout.jsx";
import DefaultLayout from "../components/Layouts/DefaultLayout.jsx";
const Home = lazy(() => import("../components/Home/index.jsx"));
const ProductManagement = lazy(() =>
  import("../components/Pages/ProductManagement.jsx")
);
const BlogManagement = lazy(() =>
  import("../components/Pages/BlogManagement.jsx")
);
const ListAllProducts = lazy(() =>
  import("../components/Pages/ListAllProducts")
);
const EditPost = lazy(() => import("../components/Pages/EditPost.jsx"));
const EditProduct = lazy(() => import("../components/Pages/EditProduct"));
const DetailProduct = lazy(() => import("../components/DetailProduct"));

const publicRouter = [
  { path: "/trangchu", element: Home, layout: null },
  { path: "/tat-ca-san-pham", element: ListAllProducts, layout: DefaultLayout },
  {
    path: "/chi-tiet-san-pham/:id",
    element: DetailProduct,
    layout: DefaultLayout,
  },
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
