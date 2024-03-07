import { memo, useEffect } from "react";
import Logo from "../../../UI/Icon/Logo";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogoutAsync } from "../../../redux/reducers/authSlice";

function SideBarAdmin() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    const active = document.getElementById(pathname.split("/")[1]);
    if (active) {
      // remove all active class
      const activeList = document.querySelectorAll(".bg-soft-pink");
      activeList.forEach((item) => {
        item.classList.remove("bg-soft-pink", "border-l-4", "border-pink");
        item.classList.add("hover:bg-soft-pink", "border-b-[1px]");
      });

      active.classList.add("bg-soft-pink", "border-l-4", "border-pink");
      active.classList.remove("hover:bg-soft-pink", "border-b-[1px]");
    }
  }, [pathname]);

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
            <Link to="/quanlysanpham">
              <li
                id="quanlysanpham"
                className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
              >
                <StoreOutlinedIcon className="mx-2" />
                Sản phẩm
              </li>
            </Link>
            <Link to="/quanlybaiviet">
              <li
                id="quanlybaiviet"
                className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
              >
                <NoteAltOutlinedIcon className="mx-2" />
                Bài viết
              </li>
            </Link>
            <Link to="/quanlykhachhang">
              <li
                id="quanlykhachhang"
                className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
              >
                <PeopleAltOutlinedIcon className="mx-2" />
                Khách hàng
              </li>
            </Link>
            <Link to="/quanlymagiamgia">
              <li
                id="quanlymagiamgia"
                className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
              >
                <ConfirmationNumberOutlinedIcon className="mx-2" />
                Voucher
              </li>
            </Link>
            <Link to="/quanlythongke">
              <li
                id="quanlythongke"
                className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]"
              >
                <BarChartOutlinedIcon className="mx-2" />
                Thống kê
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div>
        <ul>
          <Link to="/trangchu">
            <li className="hover:bg-soft-pink py-3 cursor-pointer pl-2 border-b-[1px]">
              <HomeOutlinedIcon className="mx-2" />
              Trang chủ
            </li>
          </Link>
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

export default memo(SideBarAdmin);
