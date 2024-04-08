import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addProductToCartAsync,
  clearError,
  clearMessage,
  getProductByIdAsync,
  getProductsFromCartAsync,
} from "../../redux/reducers/productSlice";
import Button from "../../UI/Button";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ProductCarousel from "../ProductCarousel";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import CatagoriesNav from "../Menu/CatagoriesNav";
import { toast } from "react-toastify";
import toastConfig from "../../config/toastConfig";
import Lottie from "react-lottie";

import addToCartSVG from "../../assets/SVG/addToCart.json";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error, message } = useSelector(
    (state) => state.productSlice
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [newestProducts, setNewestProducts] = useState([]);
  const [loadingOfAddToCart, setLoadingOfAddToCart] = useState(false);

  useEffect(() => {
    getNewestProducts();
    dispatch(getProductByIdAsync(id));
  }, []);

  useEffect(() => {
    getCategory();
    setImages(currentProduct.imageUrls);
  }, [id, currentProduct]);

  useEffect(() => {
    if (error) {
      toast.error(error, toastConfig);
      dispatch(clearError());
    }
    if (message) {
      if (message === "Đã xóa sản phẩm khỏi giỏ hàng") {
        dispatch(getProductsFromCartAsync());
      }
      toast.success(message, toastConfig);
      dispatch(clearMessage());
      setLoadingOfAddToCart(false);
    }
  }, [error, message, dispatch]);

  const getNewestProducts = async () => {
    try {
      // Get color from firestore
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("timestamp", "desc"), limit(8));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNewestProducts((prev) => [...prev, { id: doc.id, ...doc.data() }]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    const mainCollectionName = "categories";
    const subCollectionName = ["categories-topic", "categories-object"];
    const data = [];
    try {
      const mainCollectionRef = collection(db, mainCollectionName);
      const mainQuerySnapshot = await getDocs(mainCollectionRef);

      const promises = mainQuerySnapshot.docs.map(async (mainDoc, index) => {
        const subCollectionRef = collection(
          mainDoc.ref,
          subCollectionName[index]
        );
        const subQuerySnapshot = await getDocs(subCollectionRef);

        subQuerySnapshot.forEach((subDoc) => {
          if (subDoc.id === currentProduct.category) {
            data.push(subDoc.data().name);
          }
        });
      });

      await Promise.all(promises).then(() => {
        setCategory(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e, index) => {
    setActiveIndex(index);
    const container = document.querySelector(".slick-image");
    const image = e.target;
    const imageRect = image.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const imageRectLeft = containerRect.left + (imageRect.width + 3) * index;
    const scrollTo =
      imageRectLeft -
      containerRect.left -
      containerRect.width / 2 +
      (imageRect.width / 2) * 2;

    container.scroll({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  const addToCart = () => {
    setLoadingOfAddToCart(true);
    dispatch(addProductToCartAsync(currentProduct.id));
  };

  return (
    <main className="">
      <CatagoriesNav className=" mt-4 " />
      <div className="px-[5%] mx-[10%] mt-10 ">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/trangchu">
            Trang chủ
          </Link>
          <Link underline="hover" color="inherit" href="/tat-ca-san-pham">
            Sản phẩm
          </Link>
          <Typography color="text.primary">{currentProduct.name}</Typography>
        </Breadcrumbs>
      </div>
      {
        <section className="flex px-[5%] mx-[10%] mb-10">
          <div className="w-5/12">
            <div>
              <span className="w-[90%] text-pink text-sm text-end block mt-4 mx-auto">
                {images &&
                  `${activeIndex + (images?.length > 0 ? 1 : 0)}/${
                    images.length
                  }`}
              </span>
              <img
                src={images && images[activeIndex]}
                alt="preview"
                className="mx-auto w-[90%] object-cover aspect-square"
              />
            </div>
            <div className="slick-image flex justify-start items-center mb-4 pt-5 overflow-x-hidden ">
              {images &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className={
                      (activeIndex === index
                        ? "border-2 border-soft-pink border-solid "
                        : "") +
                      " relative cursor-pointer rounded-lg w-[50px] h-[50px] mx-1 flex-shrink-0"
                    }
                  >
                    <img
                      src={image}
                      alt="Xem trước"
                      className="w-full object-cover aspect-square rounded-lg"
                      onClick={(e) => {
                        handleClick(e, index);
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="w-6/12 px-3 flex flex-col justify-between pb-10">
            <h2 className="mt-6 text-3xl font-normal">{currentProduct.name}</h2>
            <div className="flex my-2">
              <span className="text-xl ml-2 line-through mx-1 text-gray-400">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(currentProduct.price * 1.2)}
              </span>
              <span className="text-pink text-2xl mx-2 ">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(currentProduct.price)}
              </span>
              <span className="text-[12px] text-black text-end">
                (Đã bao gồm VAT)
              </span>
            </div>
            <div>
              <div>Sản phầm gồm</div>
              {currentProduct.ingredients?.map((ingredient, index) => (
                <div key={index} className="ml-4">
                  <span className="text-pink">{ingredient.name}</span>
                  <span className="text-black ml-4">
                    x{ingredient.quantity}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[12px]">
              *Lưu ý: Hình ảnh sản phẩm chỉ mang tính chất thiết kế tham khảo.
              Vì các loại hoa sẽ được thay đổi theo ngày, theo mùa, chúng tôi
              khuyến khích khách hàng ĐỂ LẠI LỜI NHẮN, để nhận được tư vấn hoa
              phù hợp theo nhu cầu của quý khách.
            </p>
            <div className="flex justify-around px-3">
              <Button
                onClick={() => {
                  addToCart();
                }}
                className="w-[40%] h-[45px] mx-auto"
                color="black"
              >
                {loading && loadingOfAddToCart ? (
                  <div className="pt-1">
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: addToCartSVG,
                      }}
                      width={35}
                    />
                  </div>
                ) : (
                  "Thêm vào giỏ hàng"
                )}
              </Button>
              <Button className="w-[45%] h-[45px] mx-auto" color="pink">
                Mua ngay
              </Button>
            </div>
            <p>Gọi ngay: 1900 4702</p>
            <hr />
            <p>Danh mục: {category}</p>
            <hr />
            <div>
              <FacebookIcon className="mx-2 cursor-pointer" fontSize="small" />
              <MailOutlineIcon
                className="mx-2 cursor-pointer"
                fontSize="small"
              />
              <LocalPhoneIcon
                className="mx-2 cursor-pointer"
                fontSize="small"
              />
            </div>
          </div>
        </section>
      }
      <hr className="w-[80%] mx-auto" />
      <section className=" px-[5%] mx-[10%] mt-10 mb-10">
        <div className="border-2 w-fit px-6 py-2 border-t-4 ml-10 border-b-0 ">
          Mô tả
        </div>
        <div className="border-2">
          {currentProduct.description && (
            <p className="my-8 px-[5%]">{currentProduct.description}</p>
          )}
        </div>
      </section>
      <section className="best-seller px-[10%] my-20 ">
        <h3 className="text-5xl font-fontItalianno text-center my-6">
          Sản phẩm đề xuất
        </h3>
        <ProductCarousel products={newestProducts} />
        <div className="full flex flex-col items-center mt-8">
          <Button className={"px-12 py-2 mt-3"} color="black">
            Xem thêm
          </Button>
        </div>
      </section>
    </main>
  );
}

export default DetailProduct;
