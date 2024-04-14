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
const FlowerRecognitionApp = lazy(() =>
  import("../components/FlowerRecognitionApp")
);
const Payment = lazy(() => import("../components/Payment"));
const DetailWiki = lazy(() => import("../components/Pages/WikiFlower"));
const News = lazy(() => import("../components/Pages/News"));
const FlowerRecognitionApp = lazy(() =>
  import("../components/FlowerRecognitionApp")
);
const Payment = lazy(() => import("../components/Payment"));
const DetailWiki = lazy(() => import("../components/Pages/WikiFlower"));
const News = lazy(() => import("../components/Pages/News"));
const User = lazy(() => import("../components/user/Info"));

const publicRouter = [
  { path: "/", element: Home, layout: null },
  { path: "/san-pham", element: ListAllProducts, layout: DefaultLayout },
  {
    path: "/chi-tiet-san-pham/:id",
    element: DetailProduct,
    layout: DefaultLayout,
  },
  { path: "/wikiFlower", element: Wiki, layout: DefaultLayout },
  { path: "/wikiFlower/:id", element: DetailWiki, layout: DefaultLayout },
  { path: "/blog", element: Blog, layout: DefaultLayout },
  { path: "/blog/:id", element: Reader, layout: DefaultLayout },
  { path: "/tai-khoan/:id", element: User, layout: DefaultLayout },
  { path: "*", element: () => <div>Page not found</div>, layout: null },

  {
    path: "/tim-hoa-bang-hinh-anh",
    element: FlowerRecognitionApp,
    layout: DefaultLayout,
  },

  {
    path: "/tim-hoa-bang-hinh-anh",
    element: FlowerRecognitionApp,
    layout: DefaultLayout,
  },
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
