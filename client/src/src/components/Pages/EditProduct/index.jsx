import { useDispatch, useSelector } from "react-redux";
import CircleLoadingSpin from "../../../UI/Icon/CircleLoadingSpin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SplitButton from "../../../UI/SliptButton";
import { useNavigate, useParams } from "react-router-dom";

import InputImages from "../../../UI/InputImages";
import AddIcon from "@mui/icons-material/Add";
import TextInputWithSuggests from "../../../UI/TextInputWithSuggests";
import { useEffect, useRef, useState } from "react";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import axios from "axios";
import {
  deleteProductAsync,
  updateProductAsync,
} from "../../../redux/reducers/productSlice";
import { uploadImage } from "../../../utils/storage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

const options = ["Lưu và đăng tải", "Lưu ở chế độ riêng tư", "Hủy bỏ"];

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastForm = useRef({
    name: "",
    description: "",
    ingredients: [],
    imageUrls: [],
    avatar: "",
    displayMode: "",
    price: 0,
    stock: 0,
    voucher: [],
    category: "",
    colors: [],
  });
  const { loading, currentProduct } = useSelector(
    (state) => state.productSlice
  );
  const [form, setForm] = useState({
    name: "",
    description: "",
    ingredients: [],
    imageUrls: [],
    avatar: "",
    displayMode: "",
    price: 0,
    stock: 0,
    voucher: [],
    category: "",
    colors: [],
  });
  useEffect(() => {
    getDisplayMode();
    getCategories();
    getColors();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setForm((pre) => {
        const newForm = {
          ...pre,
          name: currentProduct.name,
          description: currentProduct.description,
          ingredients: currentProduct.ingredients,
          imageUrls: currentProduct.imageUrls,
          avatar: currentProduct.avatar,
          displayMode: currentProduct.displayMode,
          price: currentProduct.price,
          stock: currentProduct.stock,
          voucher: currentProduct.voucher,
          category: currentProduct.category,
          colors: currentProduct.colors,
        };
        lastForm.current = newForm;
        return newForm;
      });
      setIngredients(currentProduct.ingredients);
      setImages(currentProduct.imageUrls);
    }
  }, [currentProduct]);

  const [images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  useEffect(() => {
    if (!images) return;
    setForm((pre) => {
      lastForm.current = pre;
      return { ...pre, imageUrls: images, avatar: images[0] };
    });
  }, [images]);

  const [ingredients, setIngredients] = useState([]);
  const updateIngredients = (newIngredientsName, confirm = false) => {
    setIngredients((pre) => {
      const newIngredients = [...pre];
      // newIngredients[newIngredients.length - 1].name = newIngredientsName.name;
      newIngredients[newIngredients.length - 1] = {
        ...newIngredients[newIngredients.length - 1],
        ...newIngredientsName,
      };
      if (confirm) {
        newIngredients[newIngredients.length - 1].confirm = true;
      }
      return newIngredients;
    });
  };
  useEffect(() => {
    if (!ingredients) return;
    console.log(ingredients);
    setForm((pre) => {
      lastForm.current = pre;
      return { ...pre, ingredients };
    });
  }, [ingredients]);

  const [modes, setModes] = useState([]);
  const getDisplayMode = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-display-mode", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setModes(data.displayMode);
    } catch (error) {
      console.log(error);
    }
  };
  const [categories, setCategories] = useState([]);
  /*
  [{
    id: UAsaaoowh23878403,
    name: "Chủ đề",
    sub: [
      {
        id: "IoaLs28acu703",
        name: "Khai trương",
      },
      {
        id: "aloJUnsjccca",
        name: "Tình yêu",
      },
      {
        id: "IoaLs90Nhasc03",
        name: "Chúc mừng",
      }
    ]
  }]
  */
  const getCategories = async () => {
    const mainCollectionName = "categories";
    const subCollectionName = ["categories-topic", "categories-object"];
    const data = [];
    try {
      const mainCollectionRef = collection(db, mainCollectionName);
      const mainQuerySnapshot = await getDocs(mainCollectionRef);

      const promises = mainQuerySnapshot.docs.map(async (mainDoc, index) => {
        const mainData = { id: mainDoc.id, ...mainDoc.data(), sub: [] };
        data.push(mainData);

        const subCollectionRef = collection(
          mainDoc.ref,
          subCollectionName[index]
        );
        const subQuerySnapshot = await getDocs(subCollectionRef);

        subQuerySnapshot.forEach((subDoc) => {
          mainData.sub.push({ id: subDoc.id, ...subDoc.data() });
        });
      });

      await Promise.all(promises).then(() => {
        console.log(data);
        setCategories(data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [colors, setColors] = useState([]);
  const getColors = async () => {
    try {
      // Get color from firestore
      const colorRef = collection(db, "colors");
      getDocs(colorRef).then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setColors(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(form);
    if (JSON.stringify(form) === JSON.stringify(lastForm.current)) return;
    if (form.name === "") return;
    const timeout = setTimeout(() => {
      dispatch(updateProductAsync({ id, ...form }));
    }, 5000);
    return () => clearTimeout(timeout);
  }, [form]);

  const handleAdd = (selectedIndex) => {
    if (selectedIndex === 0) {
      dispatch(updateProductAsync({ id, displayMode: "public", ...form }));
    } else if (selectedIndex === 1) {
      dispatch(updateProductAsync({ id, displayMode: "private", ...form }));
    } else if (selectedIndex === 2) {
      navigate(-1);
      dispatch(deleteProductAsync(id));
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
      const newIngredients = [...pre];
      newIngredients[newIngredients.length - 1] = {
        ...newIngredients[newIngredients.length - 1],
        confirm: true,
      };
      return [...newIngredients, { name: "", quantity: 1, confirm: false }];
    });
  };
  const handleChangeForm = (e) => {
    if (e.target.name === "price") {
      // Check if the input is not a number
      if (isNaN(e.target.value)) {
        return;
      }
      // Check if the input is a number
      if (e.target.value === "") {
        setForm((pre) => {
          lastForm.current = pre;
          return { ...pre, [e.target.name]: 0 };
        });
      } else {
        setForm((pre) => {
          lastForm.current = pre;
          return { ...pre, [e.target.name]: Number(e.target.value) };
        });
      }
    }
    console.log(e.target.value, e.target.name);
    setForm((pre) => {
      lastForm.current = pre;
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = [];
      images.forEach((image) => {
        promises.push(uploadImage(image));
      });
      const result = await Promise.all(promises);
      const imageUrls = result.map((item) => item.downloadURL);
      setForm((pre) => {
        lastForm.current = pre;
        return { ...pre, imageUrls, avatar: imageUrls[0] };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeColor = (e) => {
    // Check if the color is checked then add to form.colors else remove from form.colors
    if (e.target.checked) {
      setForm((pre) => {
        lastForm.current = pre;
        // Check if the color is already in form.colors
        return pre.colors.includes(e.target.id)
          ? pre
          : { ...pre, colors: [...pre.colors, e.target.id] };
      });
    } else {
      setForm((pre) => {
        lastForm.current = pre;
        return {
          ...pre,
          colors: pre.colors.filter((color) => color !== e.target.id),
        };
      });
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
          <div className="flex">
            <h2 className="ml-4 text-2xl flex items-center">
              Chi tiết sản phẩm
            </h2>
            <span className="flex items-center text-sm text-slate-400 mx-5">
              {loading ? (
                <div className="flex">
                  <CircleLoadingSpin width="25" color="black" />
                  <span className="ml-2">Đang lưu...</span>
                </div>
              ) : (
                "Đã lưu"
              )}
            </span>
          </div>
        </div>
        <div className="w-[30%] flex justify-end">
          <SplitButton handleClick={handleAdd} options={options} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full px-2 pb-14 flex flex-col">
        <div className="flex w-full justify-between">
          <div className="w-3/5 bg-slate-200 my-4 px-4 pb-6 pt-3 flex flex-col">
            <h3 className="w-full text-xl mb-3">Thông tin chung</h3>
            <div className="w-full flex">
              <div className="w-1/2 flex flex-col">
                <div className="flex flex-col">
                  <label className=" my-1" htmlFor="name">
                    <span className="text-pink">*</span>Tên sản phẩm
                  </label>
                  <input
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onChange={handleChangeForm}
                    value={form.name}
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
                    <span className="text-pink">*</span>Mô tả
                  </label>
                  <textarea
                    value={form.description}
                    onChange={handleChangeForm}
                    autoComplete="off"
                    className="p-2 h-48 max-h-48 bg-white rounded-lg border border-slate-300 px-4 caret-pink "
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
                    <span className="text-pink">*</span>Thành phần
                  </label>
                  <div
                    className="w-full h-72 overflow-x-auto flex flex-col items-center justify-start"
                    id="ingredients"
                  >
                    {ingredients?.map((ingredient, index) => (
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
                          onFocus={(e) => {
                            e.target.select();
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
          <div className="w-[30%] bg-slate-200 my-4 px-4 pt-3 flex flex-col">
            <h3 className="w-full text-xl mb-1">Hình ảnh</h3>
            <InputImages updateImages={updateImages} />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="w-3/5 flex ">
            <div className="w-1/2 flex flex-col px-3">
              <div className="flex flex-col ">
                <label className="my-1 px-2" htmlFor="display">
                  <span className="text-pink">*</span>Hiển thị
                </label>
                <select
                  onChange={handleChangeForm}
                  className="py-1 bg-white rounded-full border border-slate-300 px-5 outline-none caret-pink "
                  name="displayMode"
                  id="display"
                >
                  {modes.map((mode) => (
                    <option
                      selected={mode.id === form.displayMode}
                      key={mode.id}
                      value={mode.id}
                    >
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col my-1">
                <label className="my-1 px-2" htmlFor="price">
                  <span className="text-pink">*</span>Giá bán
                </label>
                <input
                  onChange={handleChangeForm}
                  value={form.price}
                  autoComplete="off"
                  className="py-1 bg-white rounded-full border border-slate-300 px-5 caret-pink"
                  type="text"
                  id="price"
                  name="price"
                  required
                />
              </div>
              <div className="flex flex-col my-1">
                <label className="my-1 px-2" htmlFor="stock">
                  <span className="text-pink">*</span>Kho
                </label>
                <input
                  onChange={handleChangeForm}
                  value={form.stock}
                  autoComplete="off"
                  className="py-1 bg-white rounded-full border border-slate-300 px-5 caret-pink"
                  type="number"
                  id="stock"
                  name="stock"
                  required
                />
              </div>
            </div>
            <div className="w-1/2 px-3">
              <div className="flex flex-col ">
                <label className="my-1 px-2" htmlFor="voucher">
                  Voucher
                </label>
                <select
                  className="py-1 bg-white rounded-full border border-slate-300 px-5 outline-none caret-pink "
                  name="voucher"
                  id="voucher"
                >
                  {modes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col my-1">
                <div className="my-1 px-2">
                  <span className="text-pink">*</span>Màu sắc
                </div>
                <div className="w-full flex flex-wrap ">
                  {colors.map((color, i) => (
                    <div key={i} className="w-1/2 flex items-center my-1">
                      <input
                        className="cursor-pointer"
                        onChange={handleChangeColor}
                        type="checkbox"
                        id={color.id}
                        name="colors"
                        value={color.id}
                        checked={
                          form.colors ? form.colors.includes(color.id) : false
                        }
                      />

                      <label
                        className="ml-1 cursor-pointer"
                        htmlFor={color.id}
                        style={{ color: color.code }}
                      >
                        {color.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] bg-slate-200 my-4 px-4 pt-3 flex flex-col">
            <h3 className="w-full text-xl mb-3">Phân loại</h3>
            <div className="flex flex-col ">
              <label className="my-1 px-2" htmlFor="category">
                <span className="text-pink">*</span>Phân loại sản phẩm
              </label>
              <select
                onChange={handleChangeForm}
                className="py-1 bg-white rounded-full border border-slate-300 px-5 outline-none"
                name="category"
                id="category"
              >
                {categories.map((category) => (
                  <optgroup
                    className="text-lg"
                    key={category.id}
                    label={category.name}
                  >
                    {category.sub.map((sub) => (
                      <option
                        selected={sub.id === form.category}
                        key={sub.id}
                        value={sub.id}
                      >
                        {sub.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
