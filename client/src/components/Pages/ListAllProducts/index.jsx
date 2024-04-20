import Search from "@mui/icons-material/Search";
import Button from "../../../UI/Button";
import CatagoriesNav from "../../Menu/CatagoriesNav";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import ProductCarousel from "../../ProductCarousel";
import { useEffect, useRef, useState } from "react";
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

  const rawProducts = useRef();

  const [products, setProducts] = useState([]);
  const [sortMode, setSortMode] = useState("newest");

  const [filter, setFilter] = useState({
    flowerType: [],
    color: [],
  });

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

    getProductFromDB();
  }, []);

  const getProductFromDB = async () => {
    const tempProducts = [];
    try {
      const productsRef = collection(db, "products");
      getDocs(productsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempProducts.push({ id: doc.id, ...doc.data() });
        });
        rawProducts.current = tempProducts;
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        where("category", "==", "birthday"),
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
        where("category", "==", "congratulation"),
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
    // filter products by category
    if (activeTab.root === "topic") {
      const tempProducts = [];
      if (activeTab.sub === "all") {
        setProducts(rawProducts.current);
        return;
      }
      rawProducts.current?.forEach((product) => {
        if (product.category === activeTab.sub) {
          tempProducts.push(product);
        }
      });
      setProducts(tempProducts);
    } else if (activeTab.root === "flower") {
      const tempProducts = [];
      if (activeTab.sub === "all") {
        setProducts(rawProducts.current);
        return;
      }
      rawProducts.current?.forEach((product) => {
        product.ingredients?.forEach((ingredient) => {
          if (ingredient.id === activeTab.sub) {
            tempProducts.push(product);
          }
        });
      });
      setFilter({
        ...filter,
        flowerType: [activeTab.sub],
      });
      setProducts(tempProducts);
    } else if (activeTab.root === "color") {
      const tempProducts = [];
      rawProducts.current.forEach((product) => {
        product.colors.forEach((color) => {
          if (color === activeTab.sub) {
            tempProducts.push(product);
          }
        });
      });
      setFilter({
        ...filter,
        color: [activeTab.sub],
      });
      setProducts(tempProducts);
    } else {
      setProducts(rawProducts.current);
    }
  }, [activeTab]);

  useEffect(() => {
    console.log(filter);
    const tempProducts = [];

    // Handle filter by flower type
    if (filter.flowerType.length === 0) {
      rawProducts.current?.forEach((product) => {
        tempProducts.push(product);
      });
    } else {
      rawProducts.current?.forEach((product) => {
        filter.flowerType.forEach((type) => {
          product.ingredients.forEach((ingredient) => {
            if (ingredient.id === type) {
              let find = false;
              // Check if product already in list
              tempProducts.forEach((tempProduct) => {
                if (tempProduct.id === product.id) find = true;
              });
              if (!find) tempProducts.push(product);
            }
          });
        });
      });
    }

    // Handle filter by color
    if (filter.color.length === 0) {
    } else {
      const temp = [];
      tempProducts?.forEach((product) => {
        filter.color?.forEach((color) => {
          product.colors?.forEach((productColor) => {
            if (productColor === color) {
              let find = false;
              // Check if product already in list
              temp.forEach((tempProduct) => {
                if (tempProduct.id === product.id) find = true;
              });
              if (!find) temp.push(product);
            }
          });
        });
      });
      tempProducts.length = 0;
      temp.forEach((product) => {
        tempProducts.push(product);
      });
    }

    setProducts(tempProducts);
  }, [filter]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleSort = (mode) => {
    const tempProducts = [...products];
    if (mode === "newest") {
      tempProducts.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    } else if (mode === "lowest") {
      tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    setProducts(tempProducts);
  };

  useEffect(() => {
    handleSort(sortMode);
  }, [sortMode]);

  return (
    <>
      <CatagoriesNav handleActiveTab={setActiveTab} className=" mt-4 " />
      {activeTab.root === "all" && (
        <div className="w-full">
          <div className="bg-pink flex px-[10%] mt-14">
            <div className="flex items-center justify-center w-1/2">
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
                {/* <div className="w-full flex">
                  <input
                    type="text"
                    className="border rounded-full outline-none text-black pl-4 pr-11 py-1 w-full cursor-pointer"
                  />
                  <Search
                    fontSize="large"
                    className="-ml-11 text-black opacity-45 cursor-pointer hover:opacity-70"
                  />
                </div> */}
                <div>Nhập hình ảnh </div>

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
              {/* <Button className={"px-12 py-2 mt-9"} color="white">
                Tìm kiếm
              </Button> */}
            </div>
          </div>
          <div className="best-seller px-[10%] my-20 ">
            <h3 className="text-5xl font-fontItalianno text-center my-6">
              Sản phẩm mới nhất
            </h3>
            <ProductCarousel
              products={newestProducts.filter(
                (product) => product.displayMode === "public"
              )}
            />
            {/* <div className="full flex flex-col items-center mt-8">
              <Button className={"px-12 py-2 mt-3"} color="black">
                Xem thêm
              </Button>
            </div> */}
          </div>
          <hr className="w-[85%] mx-auto " />
          <div className="birthday px-[10%] my-20 mt-5 ">
            <h3 className="text-5xl font-fontItalianno text-center my-6">
              Hoa Sinh Nhật
            </h3>
            <ProductCarousel
              products={birthProducts.filter(
                (product) => product.displayMode === "public"
              )}
            />
            <div className="full flex flex-col items-center mt-8">
              <Button
                onClick={() => {
                  setActiveTab({ root: "topic", sub: "birthday" });
                }}
                className={"px-12 py-2 mt-3"}
                color="black"
              >
                Xem thêm
              </Button>
            </div>
          </div>
          <hr className="w-[85%] mx-auto " />
          <div className="congratulations px-[10%] my-20 mt-5">
            <h3 className="text-5xl font-fontItalianno text-center my-6">
              Hoa Chúc Mừng
            </h3>
            <ProductCarousel
              products={congratulationProducts.filter(
                (product) => product.displayMode === "public"
              )}
            />
            <div className="full flex flex-col items-center mt-8">
              <Button
                onClick={() => {
                  setActiveTab({ root: "topic", sub: "congratulation" });
                }}
                className={"px-12 py-2 mt-3"}
                color="black"
              >
                Xem thêm
              </Button>
            </div>
          </div>
          <hr className="w-[85%] mx-auto " />
        </div>
      )}
      {activeTab.root !== "all" && (
        <div className="px-[10%] flex flex-col">
          <h2 className="w-full font-fontItalianno text-center text-5xl my-4">
            {(activeTab.sub === "birthday" && "Hoa sinh nhật") ||
              (activeTab.sub === "congratulation" && "Hoa chúc mừng") ||
              (activeTab.sub === "grandOpening" && "Hoa khai trương") ||
              (activeTab.sub === "love" && "Hoa tình yêu")}
          </h2>

          <div className="w-full flex">
            <div className="w-3/12 flex justify-end">
              <div className="w-4/5">
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
                          checked={filter.flowerType.includes(flower.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilter({
                                ...filter,
                                flowerType: [...filter.flowerType, flower.id],
                              });
                            } else {
                              setFilter({
                                ...filter,
                                flowerType: filter.flowerType.filter(
                                  (item) => item !== flower.id
                                ),
                              });
                            }
                          }}
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
                          checked={filter.color.includes(color.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilter({
                                ...filter,
                                color: [...filter.color, color.id],
                              });
                            } else {
                              setFilter({
                                ...filter,
                                color: filter.color.filter(
                                  (item) => item !== color.id
                                ),
                              });
                            }
                          }}
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
            <div className="w-9/12 flex flex-col justify-end">
              <nav className="flex gap-4 my-5 pl-20">
                <div
                  onClick={() => setSortMode("newest")}
                  className={`cursor-pointer ${
                    sortMode === "newest" ? "text-pink" : ""
                  }`}
                >
                  Mới nhất
                </div>
                <div
                  onClick={() => setSortMode("lowest")}
                  className={`cursor-pointer ${
                    sortMode === "lowest" ? "text-pink" : ""
                  }`}
                >
                  Giá thấp đến cao
                </div>
                <div
                  onClick={() => setSortMode("highest")}
                  className={`cursor-pointer ${
                    sortMode === "highest" ? "text-pink" : ""
                  }`}
                >
                  Giá cao đến thấp
                </div>
              </nav>
              <div className="w-full flex justify-end">
                <div className="w-[90%] flex flex-wrap gap-6">
                  {products?.map((product) =>
                    product.displayMode === "public" ? (
                      <ProductCard
                        id={product.id}
                        className={"w-[200px]"}
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        image={product.avatar}
                      />
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListAllProducts;
