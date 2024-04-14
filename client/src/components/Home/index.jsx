import Search from "@mui/icons-material/Search";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Button from "../../UI/Button";
import Header from "../Header";
import "./styles.css";
import Footer from "../Footer";
import ProductCarousel from "../ProductCarousel";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

function Home() {
  const [newestProducts, setNewestProducts] = useState([]);

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
  useEffect(() => {
    getNewestProducts();
  }, []);

  return (
    <main className="overflow-x-hidden">
      <div id="banner-home" className="w-[100vw] h-[100vh]">
        <Header />
        <div className="px-[10%] mt-48 pb-28">
          <div className="w-1/2 text-white ml-[7%]">
            <h3 className=" font-fontItalianno text-[112px] mt-10 leading-[96px]">
              Tìm hạnh phúc <br />
              của riêng bạn
            </h3>
            <p className="mt-7">
              Những món quà tốt nhất cho những người bạn yêu thương.
              <br /> Giao hoa tươi mỗi ngày và trong vòng một giờ.
            </p>

            <Link to="/san-pham">
              <Button className={"px-12 py-2 ml-[15%] mt-8  "} color="white">
                Mua ngay!
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full px-[10%] pt-5 text-black text-center justify-center items-center">
        <div
          id="line-flower-banner"
          className="w-1/2 h-[400px] flex flex-col justify-center items-center "
        >
          <p className=" opacity-65">Mang hoa tươi mới</p>
          <h3 className="text-6xl font-fontItalianno">
            Từ khu vườn của chúng tôi
            <br />
            đến với bạn
          </h3>
          <Button className={"px-12 py-2 mt-3"} color="black">
            Mua ngay!
          </Button>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/beauty-boutique-57f03.appspot.com/o/assets%2FAlbum1Flower%201.png?alt=media&token=02cadd40-e73f-4c62-b4d6-10d89e1af4c7"
            alt="beauty-boutique"
            className="w-[90%]"
          />
        </div>
      </div>
      <div className="w-full text-center flex flex-col justify-center items-center my-28">
        <p className="text-2xl opacity-55">Món quà tuyệt vời nhất</p>
        <h3 className="text-6xl font-fontItalianno w-2/3">
          Hãy mua sản phẩm của chúng tôi!
        </h3>
        <p className="text-[18px] opacity-55 w-1/3 mt-2">
          Tất cả các loại hoa có sẵn trong nhiều hình dạng và loại khác nhau,
          đặc biệt là bó hoa được buộc tay.
        </p>
      </div>
      <div className="px-[10%] my-10 ">
        <ProductCarousel products={newestProducts} />
        <div className="full flex flex-col items-center mt-8">
          <Button className={"px-12 py-2 mt-3"} color="black">
            Xem thêm
          </Button>
        </div>
      </div>
      <div className="bg-pink flex px-[10%]">
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
            Bạn có thể tìm kiếm bông hoa mà mình mong muốn thông qua màu sắc,
            tên...ngay cả hình ảnh nữa đấy!
          </p>
          <div className="w-[55%] flex items-center justify-center mt-4">
            <div className="w-full flex">
              <input
                type="text"
                className="border rounded-full outline-none text-black pl-4 pr-11 py-1 w-full"
              />
              <Search
                fontSize="large"
                className="-ml-11 text-black opacity-45 cursor-pointer hover:opacity-70"
              />
            </div>
            <Link to="http://localhost:8502/">
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
            </Link>
          </div>
          <Button className={"px-12 py-2 mt-9"} color="white">
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div id="about" className="pt-16">
        <h3 className="font-fontItalianno text-6xl text-center">
          Về chúng tôi
        </h3>
        <div className="w-full flex justify-end">
          <p className="w-1/2 pr-[12%] mt-12">
            Chào mừng bạn đến với <strong>BEAUTY BOUTIQUE</strong> - cửa hàng
            hoa nơi chúng tôi cung cấp một loạt các loại hoa đẹp và tươi mới để
            tạo ấn tượng khó quên.
            <br />
            Với sự đa dạng của chúng tôi, từ những bông hoa tinh tế và tươi mới,
            chúng tôi sẽ giúp bạn diễn đạt cảm xúc của mình, tạo ra một không
            gian đầy niềm vui và gây ấn tượng cho những người thân yêu của bạn.
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-pink px-[10%] text-white py-10 mt-16 text-center">
        <p className="text-xl text-center">Vì sao bạn</p>
        <p className="font-fontItalianno text-center text-6xl mt-2">
          Lại chọn chúng tôi?
        </p>
        <div className="w-full flex mt-10 pb-6">
          <div className="w-1/4 px-3 flex flex-col items-center">
            <LocationOnIcon fontSize="128" className="text-6xl pt-[2px]" />
            <p className="text-xl">Vị trí </p>
            <p className="mt-5 px-[12%]">
              Vị trí thuận tiện tại trung tâm thành phố
            </p>
          </div>
          <div className="w-1/4 px-3 flex flex-col items-center">
            <LocalShippingIcon fontSize="128" className="text-6xl" />
            <p className="text-xl">Giao hàng </p>
            <p className="mt-5 px-[12%]">
              Giao hàng tận nơi đến mọi miền trên đất nước Việt Nam trong 7 ngày
              làm việc
            </p>
          </div>
          <div className="w-1/4 px-3 flex flex-col items-center">
            <AccessTimeIcon fontSize="128" className="text-6xl" />
            <p className="text-xl">Tiết kiệm thời gian </p>
            <p className="mt-5 px-[12%]">
              Bằng cách đặt hàng từ chúng tôi, bạn tiết kiệm thời gian của mình.
            </p>
          </div>
          <div className="w-1/4 px-3 flex flex-col items-center">
            <AccountCircleIcon fontSize="128" className="text-6xl" />
            <p className="text-xl">Khách hàng </p>
            <p className="mt-5 px-[12%]">
              Chúng tôi đã từng làm việc với một lượng khách hàng lớn khác nhau
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
