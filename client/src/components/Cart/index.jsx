import { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Checkbox,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch, useSelector } from "react-redux";
import { showBackDrop } from "../../redux/reducers/uiSlice";
import Login from "../user/Login";
import { toast } from "react-toastify";
import toastConfig from "../../config/toastConfig";
import {
  getProductsFromCartAsync,
  removeProductsFromCartAsync,
  updateProductInCartAsync,
} from "../../redux/reducers/productSlice";
import BAlertDialog from "../../UI/BAlertDialog";
import Lottie from "react-lottie";
import emptyCart from "../../assets/SVG/emptyCart.json";
import Button from "../../UI/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import { socket } from "../../socket";
import {
  getPaymentMethod,
  getPaymentStatus,
  reduceStock,
} from "../../utils/storage";
import { createOrder } from "../../apis/productAPI";

const cities = [
  { id: 1, name: "Hồ Chí Minh" },
  { id: 2, name: "Hà Nội" },
  { id: 3, name: "Đà Nẵng" },
  { id: 4, name: "Cần Thơ" },
];

function Cart() {
  const { productFromCart, isUpdating } = useSelector(
    (state) => state.productSlice
  );
  const { user } = useSelector((state) => state.authSlice);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(1);

  const [showPayment, setShowPayment] = useState(false);

  const paymentMethod = useRef(null);
  const paymentStatus = useRef(null);

  useEffect(() => {
    dispatch(getProductsFromCartAsync());
    paymentMethod.current = getPaymentMethod();
    paymentStatus.current = getPaymentStatus();
  }, [dispatch]);

  useEffect(() => {
    if (isUpdating) {
      dispatch(getProductsFromCartAsync());
    }
  }, [isUpdating, dispatch]);

  useEffect(() => {
    setProductList(productFromCart);
  }, [productFromCart]);

  const toggleDrawer = (newOpen) => () => {
    if (newOpen) {
      if (Object.keys(user).length === 0) {
        toast.error("Vui lòng đăng nhập để xem giỏ hàng", toastConfig);
        dispatch(showBackDrop({ element: <Login /> }));
        return;
      }

      dispatch(getProductsFromCartAsync());
    }
    setOpen(newOpen);
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setSelected((prev) => [...prev, e.target.value]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== e.target.value));
    }
  };

  useEffect(() => {
    // Count total by id in selected
    let tempTotal = 0;
    let tempQuantity = 0;
    selected.forEach((id) => {
      const product = productList.find((product) => product.product.id === id);
      tempTotal += product.product.price * product.quantity;
      console.log(tempTotal);
      tempQuantity += product.quantity;
    });
    setTotal(tempTotal);
    setQuantitySelected(tempQuantity);
  }, [selected]);

  const handleQuickDelete = (id) => {
    dispatch(removeProductsFromCartAsync([id]));
  };

  const handleDeleteSelected = () => {
    dispatch(removeProductsFromCartAsync(selected));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(productList.map((product) => product.product.id));
    } else {
      setSelected([]);
    }
  };

  const handleDecrement = (id) => {
    const product = productList.find((product) => product.product.id === id);
    if (product.quantity === 1) return;
    dispatch(updateProductInCartAsync({ id, quantity: product.quantity - 1 }));
  };

  const handleIncrement = (id) => {
    const product = productList.find((product) => product.product.id === id);
    dispatch(updateProductInCartAsync({ id, quantity: product.quantity + 1 }));
  };

  // -------------- Payment --------------

  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    city: 1,
    note: "",
    message: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setUserForm({
        ...userForm,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    // check if deliveryDate is valid
    if (e.target.id === "deliveryDate") {
      const today = new Date();
      const deliveryDate = new Date(e.target.value);
      if (deliveryDate < today) {
        toast.error("Ngày giao hàng không hợp lệ", toastConfig);
        return;
      }
    }
    // check if deliveryTime is valid
    if (e.target.id === "deliveryTime") {
      const deliveryTime = e.target.value;
      const [hour] = deliveryTime.split(":");
      if (hour < 6 || hour > 22) {
        toast.error("Thời gian giao hàng từ 6h đến 22h", toastConfig);
        return;
      }
    }

    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };

  const handleCityChange = (e) => {
    setUserForm({ ...userForm, city: e.target.value });
  };

  const [productInPayment, setProductInPayment] = useState([]);
  const handleShowPayment = () => {
    toggleDrawer(false)();
    setShowPayment(true);
    setProductInPayment([
      ...productList.filter((product) => selected.includes(product.product.id)),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Remove product fleid in productInPayment

    const order = {
      info: userForm,
      products: productInPayment,
      total: total,
      paymentStatus: paymentMethod.current === "cash" ? "paid" : "wait-payment",
      orderStatus: "pending",
    };
    const result = await createOrder({ order });
    if (result) {
      dispatch(removeProductsFromCartAsync(selected));
      setShowPayment(false);
      socket.emit("newOrder", order);
      // Loop through productInPayment to reduce stock
      productInPayment.forEach((product) => {
        reduceStock(product.product.id, product.quantity);
      });
    }
  };

  return (
    <>
      {showPayment && (
        <div
          id="payment"
          className="absolute top-0 left-0  w-screen h-screen bg-black bg-opacity-50 z-[999]"
        >
          <div className="relative py-6 w-[90vw] top-1/2 -translate-y-1/2 mx-auto flex bg-white text-black caret-current">
            <button
              className="absolute text-xl top-2 right-4 text-black p-2 rounded-full z-[999] hover:scale-110 transition-all duration-75 ease-in-out"
              type="button"
              onClick={() => {
                setShowPayment(false);
              }}
            >
              x
            </button>
            <div className=" w-1/2">
              <h3 className="text-xl text-center mt-3">Thông tin người nhận</h3>
              <form className="w-[85%] flex flex-col justify-center items-center mt-5 px-[2%]">
                <div className="w-full flex flex-col">
                  <div className="flex w-full">
                    <div className="w-1/2">
                      <div className="w-full px-[4%] mt-5 ">
                        <label htmlFor="email" className="block mb-1">
                          <span className="text-pink">*</span>Họ tên
                        </label>
                        <input
                          value={userForm.fullName}
                          onChange={handleChange}
                          autoComplete="off"
                          required
                          type="text"
                          id="fullName"
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
                        />
                      </div>
                      <div className="w-full px-[4%] mt-5 ">
                        <label htmlFor="password" className="block mb-1">
                          <span className="text-pink">*</span>Email
                        </label>
                        <input
                          value={userForm.email}
                          onChange={handleChange}
                          required
                          type="email"
                          id="email"
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="w-full px-[4%] mt-5 ">
                        <label htmlFor="email" className="block mb-1">
                          <span className="text-pink">*</span>Số điện thoại
                        </label>
                        <input
                          value={userForm.phoneNumber}
                          onChange={handleChange}
                          autoComplete="off"
                          required
                          type="text"
                          id="phoneNumber"
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
                        />
                      </div>

                      <div className="w-full px-[4%] mt-5 ">
                        <label htmlFor="city" className="block mb-1 mt-5">
                          <span className="text-pink">*</span>Thành phố
                        </label>
                        <select
                          name="city"
                          id="city"
                          value={userForm.city}
                          onChange={handleCityChange}
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none"
                        >
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-[4%] mt-5 ">
                    <label htmlFor="password" className="block mb-1">
                      <span className="text-pink">*</span>Địa chỉ
                    </label>
                    <input
                      value={userForm.address}
                      onChange={handleChange}
                      required
                      type="text"
                      id="address"
                      className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
                    />
                  </div>
                  <div className="flex w-full">
                    <div className="w-1/2">
                      <div className="w-full px-[4%] mt-5 ">
                        <label htmlFor="deliveryDate" className="block mb-1">
                          <span className="text-pink">*</span>Ngày giao hàng
                        </label>
                        <input
                          required
                          value={userForm.deliveryDate}
                          onChange={handleChange}
                          autoComplete="off"
                          name="deliveryDate"
                          type="date"
                          id="deliveryDate"
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="w-full px-[4%] mt-5 ">
                        <label htmlFor="deliveryTime" className="block mb-1">
                          <span className="text-pink">*</span>Khoảng thời gian
                        </label>
                        <input
                          required
                          value={userForm.deliveryTime}
                          onChange={handleChange}
                          autoComplete="off"
                          type="time"
                          id="deliveryTime"
                          name="deliveryTime"
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full px-[4%] mt-5 ">
                  Phương thức thanh toán
                  <div className="flex w-full justify-between">
                    <div className="flex mt-2">
                      <input
                        onChange={handleChange}
                        checked={userForm.paymentMethod === "cash"}
                        type="radio"
                        id="paymentMethod"
                        name="Method"
                        value="cash"
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor="paymentMethod">
                        Tiền mặt khi nhận hàng
                      </label>
                    </div>

                    <div className="flex mt-2">
                      <input
                        onChange={handleChange}
                        checked={userForm.paymentMethod === "bank"}
                        type="radio"
                        id="paymentMethod"
                        name="paymentMethod"
                        value="bank"
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor="payment">Ngân hàng</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="max-h-[80vh] w-1/2 pr-10 overflow-y-auto">
              <h3 className="text-xl text-center mt-3 ">Chi tiết đơn hàng</h3>

              {productInPayment.map((product) => {
                return (
                  <div key={product.product.id} className="flex mt-5 ">
                    <img
                      src={product.product.avatar}
                      alt="product"
                      className="w-1/3 max-w-16 aspect-square object-cover"
                    />
                    <div className="w-full px-2 flex items-center justify-between">
                      <div className="text-lg">{product.product.name}</div>
                      <div className="text-sm">x {product.quantity}</div>
                      <div className="text-sm">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.product.price)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="sticky bottom-0 bg-white pb-4">
                <hr className="mt-4" />
                <div className="flex justify-between mt-4">
                  <div className="text-lg">Tổng tiền</div>
                  <div className="text-lg">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total)}
                  </div>
                </div>
                <div className="w-full flex flex-col justify-end items-end mt-4">
                  <div className="text-xs font-medium">
                    Tôi đồng ý với điều khoản & điều kiện
                  </div>
                  <Button onClick={handleSubmit} className={"w-1/2 px-10 py-3"}>
                    Đặt hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <button type="button" onClick={toggleDrawer(true)}>
          <LocalMallIcon className="ml-3 cursor-pointer hover:scale-105" />
        </button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <div className="sm:w-[45vw] w-[100vw] h-[100vh]">
            <div className="sticky top-0 bg-white z-10 pb-2 shadow-[0_10px_5px_rgba(255,255,255,1)]">
              <hr className="border-t-8 border-t-soft-pink" />
              <h3 className=" text-center font-fontItalianno text-4xl mt-5">
                Giỏ hàng
              </h3>
            </div>
            {productList.length <= 0 ? (
              <div className="pt-1">
                <div className="mt-10">
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: emptyCart,
                    }}
                    width={"65%"}
                  />
                </div>
                <div className="text-center text-2xl mt-10">Giỏ hàng rỗng</div>
              </div>
            ) : (
              <div className="pb-[12vh]">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: "30vw" }} aria-label="simple table">
                    <TableHead sx={{ position: "sticky", top: 0 }}>
                      <TableRow>
                        <TableCell align="center">
                          <div className="flex ">
                            <div className="flex items-center">
                              <Checkbox
                                checked={selected.length === productList.length}
                                onChange={handleSelectAll}
                                sx={{
                                  color: "#EE9EA4",
                                  "&.Mui-checked": {
                                    color: "#FFCFD2",
                                  },
                                }}
                              />
                            </div>
                            <BAlertDialog
                              visible={selected.length > 0}
                              title="Xác nhận xóa các mục đã chọn!"
                              handleSubmit={handleDeleteSelected}
                            >
                              <div className="text-pink mx-2">Xóa</div>
                            </BAlertDialog>
                            <p className="font-semibold flex items-center">
                              Sản phẩm
                            </p>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <p className="font-semibold">Đơn giá</p>
                        </TableCell>
                        <TableCell align="right">
                          <p className="font-semibold">Số lượng</p>
                        </TableCell>
                        <TableCell align="right">
                          <p className="font-semibold">Số tiền</p>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productList.map((product) => (
                        <TableRow
                          key={product.product.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ paddingLeft: "8px", paddingRight: "4px" }}
                          >
                            <div className="w-full flex items-center">
                              <Checkbox
                                checked={selected.includes(product.product.id)}
                                value={product.product.id}
                                sx={{
                                  color: "#EE9EA4",
                                  "&.Mui-checked": {
                                    color: "#FFCFD2",
                                  },
                                }}
                                onChange={handleCheck}
                              />
                              <img
                                className="mx-2 min:w-[40px] w-[25%] max:w-[50px] object-cover aspect-square"
                                alt="avatar"
                                src={product.product.avatar}
                              />
                              <div>{product.product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.product.price)}
                          </TableCell>
                          <TableCell align="right">
                            <div className="flex items-center">
                              <button
                                onClick={() => {
                                  handleIncrement(product.product.id);
                                }}
                                type="button"
                                className="text-lg -mb-[3px] mr-1 text-gray-600"
                              >
                                +
                              </button>
                              <span className="text-base mx-1">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  handleDecrement(product.product.id);
                                }}
                                type="button"
                                className="text-lg text-gray-600"
                              >
                                <RemoveIcon
                                  fontSize="10px"
                                  className="w-[10px]"
                                />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                              .format(
                                Number(product.product.price) * product.quantity
                              )
                              .toString()}
                          </TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() => {
                                handleQuickDelete(product.product.id);
                              }}
                              type="button"
                              className="text-pink cursor-pointer select-none"
                            >
                              x
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
            <div className="bg-white fixed bottom-0 sm:w-[45vw] w-[100vw] h-[12vh]">
              <hr className="border-t-2 border-soft-pink " />
              <div className="flex justify-between px-[5%] items-end mt-4 pb-4 text-sm">
                <div className="pb-1">
                  Đã chọn{" "}
                  <span className="text-pink text-base">
                    {quantitySelected}
                  </span>{" "}
                  sản phẩm
                </div>
                <div className="pb-1">
                  Tổng tiền{" "}
                  <span className="text-pink text-base">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total)}
                  </span>
                </div>
                <Button
                  onClick={handleShowPayment}
                  disabled={selected.length <= 0}
                  className="px-10 py-3"
                >
                  <div>Mua hàng</div>
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default Cart;
