import { lazy } from "react";
import AdminLayout from "../components/Layouts/AdminLayout.jsx";
import DefaultLayout from "../components/Layouts/DefaultLayout.jsx";

const User = lazy(() => import("../components/user/Info/index.jsx"));
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
const OrderManagement = lazy(() =>
  import("../components/Pages/OrderManagement.jsx")
);
const EditPost = lazy(() => import("../components/Pages/EditPost.jsx"));
const EditProduct = lazy(() => import("../components/Pages/EditProduct"));
const DetailProduct = lazy(() => import("../components/DetailProduct"));

const publicRouter = [
  { path: "/", element: Home, layout: null },
  { path: "/tat-ca-san-pham", element: ListAllProducts, layout: DefaultLayout },
  {
    path: "/chi-tiet-san-pham/:id",
    element: DetailProduct,
    layout: DefaultLayout,
  },
  { path: "/thong-tin/", element: User, layout: DefaultLayout },

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
    path: "/quanlydonhang",
    element: OrderManagement,
    layout: AdminLayout,
    title: "Quản lý đơn hàng",
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
