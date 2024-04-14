import Search from "@mui/icons-material/Search";
import Button from "../../../UI/Button";
import Header from "../../Header";
import CatagoriesNav from "../../Menu/CatagoriesNav";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import ProductCarousel from "../../ProductCarousel";
import Footer from "../../Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import ProductCard from "../../ProductCard";
function ListAllProducts() {
  const [activeTab, setActiveTab] = useState({ root: "all", sub: null });

  const [newestProducts, setNewestProducts] = useState([]);
  const [birthProducts, setBirthProducts] = useState([]);
  const [congratulationProducts, setCongratulationProducts] = useState([]);

  const [colorInDB, setColorInDB] = useState([]);
  const [flowerTypeInDB, setFlowerTypeInDB] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getNewestProducts();
    getBirthdayProducts();
    getCongratulationProducts();

    // Get color from firestore
    const colorRef = collection(db, "colors");
    getDocs(colorRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setColorInDB((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    });

    // Get flower type from firestore
    const flowerTypeRef = collection(db, "flowers");
    getDocs(flowerTypeRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setFlowerTypeInDB((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    });

    // Get products from firestore
    const productsRef = collection(db, "products");
    getDocs(productsRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setProducts((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    });
  }, []);

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

  const getBirthdayProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("category", "==", "z4UCqfP5PmDQVHBOurkv"),
        limit(8)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setBirthProducts((prev) => {
            if (prev.length > 7) prev.shift();
            return [...prev, { id: doc.id, ...doc.data() }];
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCongratulationProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("category", "==", "uB6NpTsBgiUVknibTapn"),
        limit(8)
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCongratulationProducts((prev) => {
            if (prev.length > 7) prev.shift();
            return [...prev, { id: doc.id, ...doc.data() }];
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <>
      <CatagoriesNav handleActiveTab={setActiveTab} className=" mt-4 " />
      {activeTab.root === "all" && (
        <div className="w-full">
          <div className="bg-pink flex px-[10%] mt-14">
            <div className="flex items-center justify-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/beauty-boutique-57f03.appspot.com/o/assets%2Fstill-life-daisy-flowers%201.png?alt=media&token=5e0e5461-1081-4dae-b2ac-a16aa9d1b9b5"
                alt="search"
                className="h-2/3"
              />
            </div>
            <div className="text-center text-white flex flex-col justify-around items-center py-[3.5%] -ml-10">
              <p className="text-2xl">Bạn cần tìm bông hoa</p>
              <p className="text-5xl font-fontItalianno my-2">
                Mà không biết tên bông hoa đó?
              </p>
              <p className="text-lg px-[15%]">
                Bạn có thể tìm kiếm bông hoa mà mình mong muốn thông qua màu
                sắc, tên...ngay cả hình ảnh nữa đấy!
              </p>
              <div className="w-[55%] flex items-center justify-center mt-4">
                <div className="w-full flex">
                  <input
                    type="text"
                    className="border rounded-full outline-none text-black pl-4 pr-11 py-1 w-full cursor-pointer"
                  />
                  <Search
                    fontSize="large"
                    className="-ml-11 text-black opacity-45 cursor-pointer hover:opacity-70"
                  />
                </div>
                <button
                  onMouseEnter={(e) => {
                    const span = document.createElement("span");
                    span.innerText = "Hình ảnh";
                    span.id = "image-span";
                    span.style.opacity = "0";
                    span.className =
                      "text-black whitespace-nowrap transition-all duration-300 px-2";
                    e.target.appendChild(span);
                    setTimeout(() => {
                      span.style.opacity = "1";
                    }, 70);
                  }}
                  onMouseLeave={(e) => {
                    if (e.target.lastChild.id === "image-span") {
                      e.target.removeChild(e.target.lastChild);
                    }
                  }}
                  className={
                    "w-[37px] border rounded-full p-[6px] mx-2 bg-white" +
                    " text-black flex items-center" +
                    " justify-center transition-all duration-400 hover:w-[170px]"
                  }
                  color="white"
                >
                  <ImageSearchIcon fontSize="medium" color="inherit" />
                </button>
              </div>
              <Button className={"px-12 py-2 mt-9"} color="white">
                Tìm kiếm
              </Button>
            </div>
          </div>
          <div className="best-seller px-[10%] my-20 ">
            <h3 className="text-5xl font-fontItalianno text-center my-6">
              Sản phẩm mới nhất
            </h3>
            <ProductCarousel products={newestProducts} />
            <div className="full flex flex-col items-center mt-8">
              <Button className={"px-12 py-2 mt-3"} color="black">
                Xem thêm
              </Button>
            </div>
          </div>
          <hr className="w-[85%] mx-auto " />
          <div className="birthday px-[10%] my-20 mt-5 ">
            <h3 className="text-5xl font-fontItalianno text-center my-6">
              Hoa Sinh Nhật
            </h3>
            <ProductCarousel products={birthProducts} />
            <div className="full flex flex-col items-center mt-8">
              <Button className={"px-12 py-2 mt-3"} color="black">
                Xem thêm
              </Button>
            </div>
          </div>
          <hr className="w-[85%] mx-auto " />
          <div className="congratulations px-[10%] my-20 mt-5">
            <h3 className="text-5xl font-fontItalianno text-center my-6">
              Hoa Chúc Mừng
            </h3>
            <ProductCarousel products={congratulationProducts} />
            <div className="full flex flex-col items-center mt-8">
              <Button className={"px-12 py-2 mt-3"} color="black">
                Xem thêm
              </Button>
            </div>
          </div>
          <hr className="w-[85%] mx-auto " />
        </div>
      )}
      {activeTab.root !== "all" && (
        <div className="px-[10%] flex">
          <div className="w-3/12 flex justify-end">
            <div className="w-4/5">
              <div>
                <label htmlFor="price" className="text-2xl">
                  Khoảng giá
                </label>
                <input
                  type="range"
                  name="price"
                  id="price"
                  className="w-3/4 cursor-pointer"
                />
              </div>

              <div className="py-4">
                <label className="text-base font-medium mt-4 my-4">
                  Loại hoa
                </label>
                <div className="flex flex-wrap gap-2">
                  {flowerTypeInDB.map((flower) => (
                    <div
                      key={flower.id}
                      className="w-full flex items-center justify-start gap-6 pl-[15%]"
                    >
                      <input
                        type="checkbox"
                        name="flower"
                        id={flower.id}
                        className="cursor-pointer"
                      />
                      <p>{flower.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-4">
                <label
                  htmlFor="color"
                  className="text-base font-medium mt-4 my-4"
                >
                  Màu sắc
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorInDB.map((color) => (
                    <div
                      key={color.id}
                      className="w-full flex items-center justify-start gap-6 pl-[15%]"
                    >
                      <input
                        type="checkbox"
                        name="color"
                        id={color.id}
                        className="cursor-pointer"
                      />
                      <p>{color.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-9/12">
            <div className="w-full flex flex-wrap gap-5">
              {products.map((product) => (
                <ProductCard
                  className={"w-[300px]"}
                  key={product.id}
                  title={product.name}
                  price={product.price}
                  image={product.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListAllProducts;
