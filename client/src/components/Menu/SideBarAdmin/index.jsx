import { useEffect } from "react";
import Logo from "../../../UI/Icon/Logo";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogoutAsync } from "../../../redux/reducers/authSlice";

function SideBarAdmin() {
  const dispatch = useDispatch();
  useEffect(() => {
    const url = window.location.pathname;
    console.log(url.split("/")[1]);
    const active = document.getElementById(url.split("/")[1]);
    if (active) {
      active.classList.add("bg-soft-pink", "border-l-4", "border-pink");
      active.classList.remove("hover:bg-soft-pink", "border-b-[1px]");
    }
  }, []);

  const handleLogout = () => {
    dispatch(userLogoutAsync());
  };

  return (
    <div className="w-2/12 h-full pb-10 pt-16 border-r-[2px] flex flex-col justify-between fixed bottom-0">
      <div className="w-full">
        <div className="w-full flex justify-center -ml-2">
          <Logo width="140" />
        </div>
        <nav className="mt-14">
          <ul>
            <li
              id="product-management"
              className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
            >
              <StoreOutlinedIcon className="mx-2" />
              Sản phẩm
            </li>
            <li
              id="blog-management"
              className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
            >
              <NoteAltOutlinedIcon className="mx-2" />
              Bài viết
            </li>
            <li
              id="user-management"
              className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
            >
              <PeopleAltOutlinedIcon className="mx-2" />
              Khách hàng
            </li>
            <li
              id="voucher-management"
              className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
            >
              <ConfirmationNumberOutlinedIcon className="mx-2" />
              Voucher
            </li>
            <li
              id="analysis-management"
              className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
            >
              <BarChartOutlinedIcon className="mx-2" />
              Thống kê
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <ul>
          <li className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]">
            <Link to="/home">
              <HomeOutlinedIcon className="mx-2" />
              Trang chủ
            </Link>
          </li>
          <li className="hover:bg-soft-pink py-3 cursor-pointer pl-2">
            <button type="button" onClick={handleLogout}>
              <LogoutOutlinedIcon className="mx-2" />
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarAdmin;
