import { useSelector } from "react-redux";
import SideBarAdmin from "../Menu/SideBarAdmin";
import loadingSVG from "../../assets/SVG/loading-svg.json";
import lottieConfig from "../../config/lottieConfig";
import Lottie from "react-lottie";
import { Backdrop } from "@mui/material";

function AdminLayout({ children }) {
  const { loading } = useSelector((state) => state.productSlice);
  return (
    <>
      {loading && (
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
      <div className="w-full flex h-[100vh]">
        <SideBarAdmin />
        <div className="w-10/12 pl-5 pt-16 absolute right-0">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
