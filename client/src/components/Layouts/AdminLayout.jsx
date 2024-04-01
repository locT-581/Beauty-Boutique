import { useSelector } from "react-redux";
import SideBarAdmin from "../Menu/SideBarAdmin";
import loadingSVG from "../../assets/SVG/loading-svg.json";
import lottieConfig from "../../config/lottieConfig";
import Lottie from "react-lottie";
import { Backdrop } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import newOrderSVG from "../../assets/SVG/newOrder.json";
import Button from "../../UI/Button";
function AdminLayout({ children }) {
  const { loading, isUpdating } = useSelector((state) => state.productSlice);
  const [newOrder, setNewOrder] = useState(false);

  useEffect(() => {
    socket.on("receiveOrder", () => {
      console.log("🚀 Order Received!");
      setNewOrder(true);
    });

    return () => {
      socket.off("receiveOrder");
    };
  }, []);
  const handleClose = () => {
    setNewOrder(false);
  };
  return (
    <>
      {loading && !isUpdating && (
        <Backdrop
          transitionDuration={{ appear: 100, enter: 0, exit: 300 }}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1501,
            display: "flex",
            justifyContent: "end",
          }}
          open
        >
          <div className="w-10/12 flex items-center justify-center pr-[4%]">
            <Lottie
              options={lottieConfig(loadingSVG)}
              height={200}
              width={200}
            />
          </div>
        </Backdrop>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={newOrder}
        onClick={handleClose}
      >
        <div className="flex flex-col w-[80vw] justify-center">
          <h1 className="text-pink text-2xl text-center">Có đơn hàng mới</h1>
          <Lottie
            isClickToPauseDisabled={true}
            options={{
              loop: true,
              autoplay: true,
              animationData: newOrderSVG,
            }}
            width={"35%"}
          />
          <Button className="px-4 py-2 w-[20%] mx-auto">Xác nhận</Button>
        </div>
      </Backdrop>
      <div className="w-full flex h-[100vh]">
        <SideBarAdmin />
        <div className="w-10/12 pl-5 pt-4 absolute right-0">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
