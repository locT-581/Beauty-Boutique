import { useSelector } from "react-redux";
import CircleLoadingSpin from "../../../UI/Icon/CircleLoadingSpin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SplitButton from "../../../UI/SliptButton";
import { useNavigate } from "react-router-dom";

import InputImages from "../../../UI/InputImages";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const options = ["Lưu và đăng tải", "Lưu ở chế độ riêng tư", "Hủy bỏ"];

function EditProduct() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.productSlice);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: 0 }]);

  const handleAdd = (selectedIndex) => {
    if (selectedIndex === 0) {
    } else if (selectedIndex === 1) {
    } else if (selectedIndex === 2) {
    }
  };
  return (
    <div className="edit-product w-full px-5 pr-20 overflow-x-hidden flex flex-col">
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
        <div className="flex w-full justify-between">
          <div className="w-3/5 bg-slate-200 my-4 px-4 pb-6 pt-3 flex flex-col">
            <h3 className="w-full text-xl mb-3">Thông tin chung</h3>
            <div className="w-full flex">
              <div className="w-1/2 flex flex-col">
                <div className="flex flex-col">
                  <label className=" my-1" htmlFor="name">
                    Tên sản phẩm
                  </label>
                  <input
                    autoComplete="off"
                    className="py-1 bg-white rounded-full border border-slate-300 px-5 caret-pink"
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="flex flex-col pt-6">
                  <label className=" my-1" htmlFor="description">
                    Mô tả
                  </label>
                  <textarea
                    autoComplete="off"
                    className="p-2 h-60 max-h-56 bg-white rounded-lg border border-slate-300 px-4 caret-pink "
                    type="text"
                    id="description"
                    name="description"
                    required
                  />
                </div>
              </div>
              <div className="w-1/2 px-4">
                <div className="flex flex-col pl-3">
                  <label className="my-1 px-5" htmlFor="ingredients">
                    Thành phần
                  </label>
                  <div
                    className="w-full h-60 flex flex-col items-center justify-start"
                    id="ingredients"
                  >
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="w-full flex items-center justify-around"
                      >
                        <input
                          value={ingredient.name}
                          autoComplete="off"
                          className="w-[70%] py-1 rounded-full bg-white border border-slate-300 px-4 caret-pink"
                          type="text"
                          name="ingredients"
                          required
                        />
                        <input
                          onChange={(e) => {
                            const newIngredients = [...ingredients];
                            newIngredients[index].quantity = e.target.value;
                            setIngredients(newIngredients);
                          }}
                          min={0}
                          value={ingredient.quantity}
                          autoComplete="off"
                          className="w-[20%] py-1 rounded-full bg-white border border-slate-300 pl-4 pr-2 caret-pink"
                          type="number"
                          name="ingredients"
                          required
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="border-[2px] border-dashed w-[92%] py-[2px] mt-3 mx-auto rounded-xl border-pink "
                    >
                      <AddIcon className="text-pink mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] bg-slate-200 my-4 px-4 pb-6 pt-3 flex flex-col">
            <h3 className="w-full text-xl mb-3">Hình ảnh</h3>
            <InputImages />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
