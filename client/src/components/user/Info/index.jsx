import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getOrderHistory, getOrderStatus } from "../../../utils/storage";
import Button from "../../../UI/Button";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

function User({ title }) {
  const { user } = useSelector((state) => state.authSlice);
  const { isNewOrder } = useSelector((state) => state.productSlice);

  const [activeModes, setActiveModes] = useState("history");
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getOrderStatus();
      setOrderStatus(data);
    })();
  }, [isNewOrder]);

  const [orderHistory, setOrderHistory] = useState([{}]);
  const [activeTab, setActiveTab] = useState("pending");
  // const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getHistory = async (userId) => {
      const data = await getOrderHistory(userId);
      // get the order have status is pending
      const orderHistory = data.filter(
        (order) => order.orderStatus === activeTab
      );
      setOrderHistory(orderHistory);
    };
    if (user && Object.keys(user).length > 0) {
      getHistory(user.uid);
    }
  }, []);

  useEffect(() => {
    const getHistory = async (userId) => {
      const data = await getOrderHistory(userId);
      // get the order have status is pending
      const orderHistory = data.filter(
        (order) => order.orderStatus === activeTab
      );
      setOrderHistory(orderHistory);
    };
    if (user && Object.keys(user).length > 0) {
      getHistory(user.uid);
    }
  }, [activeTab, user]);

  const handleTabClick = (e) => {
    const tab = e.target;
    setActiveTab(tab.id);
  };

  const [showPayment, setShowPayment] = useState(false);
  const [detailOrder, setDetailOrder] = useState();

  const handleShowDetail = (id) => {
    setShowPayment(true);
    const order = orderHistory.find((order) => order.id === id);
    setDetailOrder(order);
    console.log(order);
  };

  const handleConfirm = async (id) => {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "orders-history")
    );
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        updateDoc(doc.ref, {
          userConfirm: true,
        });
      }
    });
    window.location.reload();
  };

  return (
    <>
      {showPayment && (
        <div
          id="payment"
          className="fixed top-0 left-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-50 z-[999]"
        >
          <div className="relative py-6 w-[80vw] top-1/2 -translate-y-1/2 mx-auto flex bg-white text-black caret-current">
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
                          disabled
                          value={detailOrder.info.fullName}
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
                          disabled
                          value={detailOrder.info.email}
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
                          disabled
                          value={detailOrder.info.phoneNumber}
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
                          value={detailOrder.info.city}
                          className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none"
                        >
                          <option
                            key={detailOrder.info.city.id}
                            value={detailOrder.info.city.id}
                          >
                            {detailOrder.info.city.name}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-[4%] mt-5 ">
                    <label htmlFor="password" className="block mb-1">
                      <span className="text-pink">*</span>Địa chỉ
                    </label>
                    <input
                      disabled
                      value={detailOrder.info.address}
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
                          value={detailOrder.info.deliveryDate}
                          disabled
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
                          disabled
                          value={detailOrder.info.deliveryTime}
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
                        checked={detailOrder.info.paymentMethod === "cash"}
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
                        checked={detailOrder.info.paymentMethod === "bank"}
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

              {detailOrder.products.map((product) => {
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
                    }).format(detailOrder.total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex px-[10%] min-h-[80vh]">
        <div className="w-3/12 pr-4 h-fit sticky top-[200px] flex flex-col">
          <div className="w-full px-4 mx-4 text-lg bg-pink text-white py-3 border">
            {"Xin chào, " + user.fullName}
          </div>
          <div
            onClick={() => {
              setActiveModes("history");
            }}
            className={
              "w-full px-4 mx-4 py-3 border cursor-pointer hover:bg-soft-pink " +
              (activeModes === "history" ? " bg-soft-pink" : "")
            }
          >
            Lịch sử mua hàng
          </div>
          <div
            onClick={() => {
              setActiveModes("info");
            }}
            className={
              "w-full px-4 mx-4 py-3 border cursor-pointer hover:bg-soft-pink " +
              (activeModes === "info" ? " bg-soft-pink" : "")
            }
          >
            Thông tin tài khoản
          </div>

          <div
            onClick={() => {}}
            className="w-full px-4 mx-4 py-3 border cursor-pointer hover:bg-soft-pink"
          >
            Đăng xuất
          </div>
        </div>
        <div className="w-9/12 ">
          {activeModes === "history" && (
            <div>
              <div className="sticky top-0 bg-white pb-3 mt-3 drop-shadow-sm pt-5">
                <h3 className="text-2xl font-semibold px-10">{title}</h3>
                <ul className="w-full flex justify-around mt-6">
                  <li
                    onClick={handleTabClick}
                    className={
                      "cursor-pointer" +
                      (activeTab === "pending"
                        ? " text-[#F2CB05] border-b-2 border-b-[#F2CB05]"
                        : "")
                    }
                    id="pending"
                  >
                    Chờ xác nhận
                  </li>
                  <li
                    onClick={handleTabClick}
                    className={
                      "cursor-pointer" +
                      (activeTab === "awaiting-fulfillment"
                        ? " text-[#F2CB05] border-b-2 border-b-[#F2CB05]"
                        : "")
                    }
                    id="awaiting-fulfillment"
                  >
                    Chờ lấy hàng
                  </li>
                  <li
                    onClick={handleTabClick}
                    className={
                      "cursor-pointer" +
                      (activeTab === "shipped"
                        ? " text-[#F2CB05] border-b-2 border-b-[#F2CB05]"
                        : "")
                    }
                    id="shipped"
                  >
                    Đang vận chuyển{" "}
                  </li>
                  <li
                    onClick={handleTabClick}
                    className={
                      "cursor-pointer" +
                      (activeTab === "completed"
                        ? " text-[#F2CB05] border-b-2 border-b-[#F2CB05]"
                        : "")
                    }
                    id="completed"
                  >
                    Hoàn thành
                  </li>
                  <li
                    onClick={handleTabClick}
                    className={
                      "cursor-pointer" +
                      (activeTab === "declined"
                        ? " text-[#F2CB05] border-b-2 border-b-[#F2CB05]"
                        : "")
                    }
                    id="declined"
                  >
                    Đã hủy
                  </li>
                </ul>
              </div>
              <div className=" ">
                <div className="mt-10 overflow-y-auto">
                  {orderHistory?.map((order, i) => {
                    // Change timestamp to date
                    const date = new Date(order.timestamp?.seconds * 1000);
                    const formattedDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    return (
                      <div key={i} className="border mx-4 my-5">
                        <div className="flex justify-between px-4 py-4 border-b-2">
                          <div className="flex items-center">
                            <div>{formattedDate}</div>
                            <div
                              onClick={() => {
                                handleShowDetail(order.id);
                              }}
                              className="px-5 cursor-pointer text-pink text-sm underline underline-offset-2"
                            >
                              Chi tiết
                            </div>
                          </div>
                          <div className="text-pink">
                            {
                              orderStatus.find(
                                (status) => status.id === order.orderStatus
                              )?.name
                            }
                          </div>
                        </div>
                        <div>
                          {order.products?.map((product) => {
                            return (
                              <div key={product.id} className="flex my-3 px-6 ">
                                <img
                                  src={product.product.avatar}
                                  alt="product"
                                  className="w-1/3 max-w-16 aspect-square object-cover"
                                />
                                <div className="w-full px-2 flex items-center justify-between">
                                  <div className="text-lg">
                                    {product.product.name}
                                  </div>
                                  <div className="text-sm">
                                    x {product.quantity}
                                  </div>
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
                        </div>
                        <div className="text-end px-6 py-4 border-t-2 flex justify-between items-center">
                          <span>
                            {"Tổng cộng: " +
                              new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(order.total)}
                          </span>
                          {activeTab === "completed" && !order.userConfirm && (
                            <div>
                              <Button
                                onClick={() => handleConfirm(order.id)}
                                type="button"
                                className="px-5 py-2"
                              >
                                Xác nhận đã nhận hàng
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
