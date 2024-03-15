import { useSelector } from "react-redux";
import CircleLoadingSpin from "../../../UI/Icon/CircleLoadingSpin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SplitButton from "../../../UI/SliptButton";
import { useNavigate } from "react-router-dom";

import InputImages from "../../../UI/InputImages";
import AddIcon from "@mui/icons-material/Add";
import TextInputWithSuggests from "../../../UI/TextInputWithSuggests";
import { useEffect, useRef, useState } from "react";
import Close from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Check from "@mui/icons-material/Check";

const options = ["Lưu và đăng tải", "Lưu ở chế độ riêng tư", "Hủy bỏ"];

function EditProduct() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.productSlice);

  const [images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const [ingredients, setIngredients] = useState([]);
  const updateIngredients = (newIngredientsName, confirm = false) => {
    setIngredients((pre) => {
      const newIngredients = [...pre];
      newIngredients[newIngredients.length - 1].name = newIngredientsName;
      if (confirm) {
        newIngredients[newIngredients.length - 1].confirm = true;
      }
      return newIngredients;
    });
  };

  const handleAdd = (selectedIndex) => {
    if (selectedIndex === 0) {
    } else if (selectedIndex === 1) {
    } else if (selectedIndex === 2) {
    }
  };

  const handleChangeQuantity = (index) => (e) => {
    setIngredients((pre) => {
      const newIngredients = [...pre];
      newIngredients[index].quantity = e.target.value;
      return newIngredients;
    });
  };
  const handleAddIngredient = () => {
    setIngredients((pre) => {
      pre[pre.length - 1] && (pre[pre.length - 1].confirm = true);
      return [...pre, { name: "", quantity: 1, confirm: false }];
    });
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
                    name="product-name"
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
                <div className="relative flex flex-col pl-3">
                  <label className="my-1 px-5" htmlFor="ingredients">
                    Thành phần
                  </label>
                  <div
                    className="w-full h-80 overflow-x-auto flex flex-col items-center justify-start"
                    id="ingredients"
                  >
                    {ingredients.map((ingredient, index) => (
                      <div
                        data-index={index}
                        key={index}
                        className="w-full flex items-center justify-around py-1"
                      >
                        {ingredient.confirm ? (
                          <div className="cursor-default w-[70%] py-1 rounded-full bg-white border border-slate-300 px-4 caret-pink">
                            {ingredient.name}
                          </div>
                        ) : (
                          <TextInputWithSuggests
                            ignore={ingredients.map((e) => e.name)}
                            updateValue={updateIngredients}
                            name="ingredients-name"
                            autoFocus={true}
                            className={
                              " w-[70%] py-1 rounded-full bg-white border border-slate-300 px-4 caret-pink"
                            }
                          />
                        )}
                        <input
                          onChange={(e) => {
                            handleChangeQuantity(index)(e);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddIngredient();
                            }
                          }}
                          min={1}
                          value={ingredient.quantity}
                          autoComplete="off"
                          className="w-[20%] py-1 rounded-full bg-white border border-slate-300 pl-[4%] pr-[2%] caret-pink"
                          type="number"
                          name="ingredients-quantity"
                          required
                        />
                        {ingredient.confirm ? (
                          <Close
                            onClick={() => {
                              setIngredients((pre) => {
                                const newIngredients = [...pre];
                                newIngredients.splice(index, 1);
                                return newIngredients;
                              });
                            }}
                            fontSize="small"
                            className="cursor-pointer"
                          />
                        ) : (
                          <Check
                            onClick={() => {
                              if (
                                document.querySelector(
                                  `input[name="ingredients-name"]`
                                ).value === ""
                              ) {
                                setIngredients((pre) => {
                                  const newIngredients = [...pre];
                                  newIngredients.splice(index, 1);
                                  return newIngredients;
                                });
                              } else {
                                setIngredients((pre) => {
                                  const newIngredients = [...pre];
                                  newIngredients[index].confirm = true;
                                  return newIngredients;
                                });
                              }
                            }}
                            fontSize="small"
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      onClick={handleAddIngredient}
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
            <InputImages updateImages={updateImages} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
