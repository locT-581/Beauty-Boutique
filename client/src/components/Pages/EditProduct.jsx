import { useSelector } from "react-redux";
import CircleLoadingSpin from "../../UI/Icon/CircleLoadingSpin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SplitButton from "../../UI/SliptButton";
import { useNavigate } from "react-router-dom";

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
      <form className="w-full px-2">
        <div className="w-3/5 bg-slate-200 my-4 px-4 py-6 flex flex-col">
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
      </form>
    </div>
  );
}

export default EditProduct;
