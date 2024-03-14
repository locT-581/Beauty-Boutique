import { useSelector } from "react-redux";
import CircleLoadingSpin from "../../UI/Icon/CircleLoadingSpin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SplitButton from "../../UI/SliptButton";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const options = ["Lưu và đăng tải", "Lưu ở chế độ riêng tư", "Hủy bỏ"];

function EditProduct() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.productSlice);

  const handleAdd = (selectedIndex) => {
    if (selectedIndex === 0) {
    } else if (selectedIndex === 1) {
    } else if (selectedIndex === 2) {
    }
  };
  const settings = {
    customPaging: function (i) {
      return (
        <img
          className="w-full object-cover aspect-square"
          src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/Spring%202024/ti-amo.jpg.webp"
          alt="preview"
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="edit-product w-full px-5 overflow-x-hidden flex flex-col">
      <div className="flex p-2">
        <div className="flex w-[70%]">
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
          >
            <ArrowBackIosIcon />
          </button>
          <div className="ml-4 text-2xl flex items-center">
            Chi tiết sản phẩm
          </div>
        </div>
        <div className="w-[30%] flex justify-end">
          <SplitButton handleClick={handleAdd} options={options} />
        </div>
      </div>
      <form className="w-full px-2 flex flex-col">
        <div className="flex w-full">
          <div className="w-3/5 bg-slate-200 my-4 mr-4 px-4 py-6 flex flex-col">
            <h3 className="w-full text-xl mb-3">Thông tin chung</h3>
            <div className="w-full flex">
              <div className="w-1/2 flex flex-col">
                <div className="flex flex-col">
                  <label className=" my-1" htmlFor="name">
                    Tên sản phẩm
                  </label>
                  <input
                    autoComplete="off"
                    className="p-2 bg-white"
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className=" my-1" htmlFor="description">
                    Mô tả
                  </label>
                  <textarea
                    autoComplete="off"
                    className="p-2 h-40 bg-white resize-none"
                    type="text"
                    id="description"
                    name="description"
                    required
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex flex-col">
                  <label className=" my-1" htmlFor="ingredients">
                    Thành phần
                  </label>
                  <input
                    autoComplete="off"
                    className="p-2 bg-white"
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-slate-200 my-4 ml-4 px-4 py-6 flex flex-col">
            <h3 className="w-full text-xl mb-3">Hình ảnh</h3>
            <div>
              <Slider {...settings} arrows={false}>
                <div>
                  <img
                    className="w-2/3 mx-auto object-cover aspect-square"
                    src="https://vietflower.vn/wp-content/uploads/2017/05/C%C3%A1ch-b%C3%B3-hoa-c%C6%B0%E1%BB%9Bi-%C4%91%E1%BA%B9p-theo-t%E1%BB%ABng-l%E1%BB%9Bp-%C6%B0%E1%BB%9Bc-l%E1%BB%87-225x300.jpg"
                    alt="preview"
                  />
                </div>
                <div>
                  <img
                    className="w-2/3 mx-auto object-cover aspect-square"
                    src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/Spring%202024/ti-amo.jpg.webp"
                    alt="preview"
                  />
                </div>
                <div>
                  <img
                    className="w-2/3 mx-auto object-cover aspect-square"
                    src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/Spring%202024/ti-amo.jpg.webp"
                    alt="preview"
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
