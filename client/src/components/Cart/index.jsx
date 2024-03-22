import { useEffect, useState } from "react";
import {
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
} from "../../redux/reducers/productSlice";
import BAlertDialog from "../../UI/BAlertDialog";
import Lottie from "react-lottie";
import emptyCart from "../../assets/SVG/emptyCart.json";
import Button from "../../UI/Button";

function Cart() {
  const { productFromCart } = useSelector((state) => state.productSlice);
  const { user } = useSelector((state) => state.authSlice);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(1);

  useEffect(() => {
    dispatch(getProductsFromCartAsync());
  }, [dispatch]);

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
      tempQuantity += product.quantity;
    });
    setTotal(tempTotal);
    setQuantitySelected(tempQuantity);
  }, [selected]);

  const handleDelete = (id) => {
    console.log(id);
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

  return (
    <div>
      <button type="button" onClick={toggleDrawer(true)}>
        <LocalMallIcon className="ml-3 cursor-pointer hover:scale-105" />
      </button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className="sm:w-[40vw] w-[100vw] h-[100vh]">
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
                        <div className="flex justify-around">
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
                              // className="cursor-pointer form-checkbox text-soft-pink h-4 w-4"
                            />
                          </div>
                          <BAlertDialog
                            visible={selected.length > 0}
                            title="Xác nhận xóa các mục đã chọn!"
                            handleSubmit={handleDeleteSelected}
                          >
                            <div className="text-pink">Xóa</div>
                          </BAlertDialog>
                          <p className="font-semibold">Sản phẩm</p>
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
                              className="mx-2 min:w-[20px] w-[25%] object-cover aspect-square"
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
                        <TableCell align="right">{product.quantity}</TableCell>
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
                              handleDelete(product.product.id);
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
          <div className="bg-white fixed bottom-0 sm:w-[40vw] w-[100vw] h-[12vh]">
            <hr className="border-t-2 border-soft-pink " />
            <div className="flex justify-between px-[5%] items-end mt-4 pb-4 text-sm">
              <div className="pb-1">
                Đã chọn{" "}
                <span className="text-pink text-base">{quantitySelected}</span>{" "}
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
              <Button className="px-10 py-3">
                <div>Mua hàng</div>
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Cart;
