import { Link } from "react-router-dom";
import Logo from "../../UI/Icon/Logo";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

import TriggerTooltip from "../../UI/TriggersTooltip";
import { useEffect } from "react";
import BBackdrop from "../../UI/BBackdrop";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastConfig from "../../config/toastConfig";
import {
  clearError,
  clearMessage,
  loadUserAsync,
} from "../../redux/reducers/authSlice";
import Authenticated from "./Submenu/Authenticated";
import UnAuthenticated from "./Submenu/NotAuthenticated";
import { closeBackDrop } from "../../redux/reducers/uiSlice";
import AdminMenu from "./Submenu/AdminMenu";
import Cart from "../Cart";

function Header({ className = " ", ...rest }) {
  const dispatch = useDispatch();
  const { element } = useSelector((state) => state.uiSlice);
  const { isAuthenticated, error, message, user } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, toastConfig);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, toastConfig);
      dispatch(clearMessage());
    }
    if (isAuthenticated) {
      dispatch(closeBackDrop());
    }
  }, [error, isAuthenticated, message, dispatch]);

  return (
    <>
      <BBackdrop>{element}</BBackdrop>
      <header
        className={
          " w-full flex justify-between items-center text-white px-[10%] py-[1%] " +
          className
        }
      >
        <div className="pr-[1%] w-2/12">
          <Logo width="140" />
        </div>
        <nav className="w-8/12 flex pl-[3%]">
          <ul className="flex w-full">
            <li className="px-[1%] hover:scale-105 hover:text-slate-100">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="px-[1%] hover:scale-105 hover:text-slate-100">
              <Link to="/chu-de">Chủ đề</Link>
            </li>
            <li className="px-[1%] hover:scale-105 hover:text-slate-100">
              <Link to="/wikiFlower">WikiFlower</Link>
            </li>
            <li className="px-[1%] hover:scale-105 hover:text-slate-100">
              <Link to="/tin-tuc">Tin tức</Link>
            </li>
            <li className="px-[1%] hover:scale-105 hover:text-slate-100">
              <a href="#about">Về chúng tôi</a>
            </li>
          </ul>
        </nav>
        <div className="w-2/12 flex justify-between px-6">
          <SearchIcon className="ml-3 cursor-pointer hover:scale-105" />
          <TriggerTooltip
            title={
              isAuthenticated ? (
                user.isAdmin ? (
                  <AdminMenu />
                ) : (
                  <Authenticated />
                )
              ) : (
                <UnAuthenticated />
              )
            }
          >
            <PersonIcon className="ml-3 cursor-pointer hover:scale-105" />
          </TriggerTooltip>
          <span>
            <Cart />
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
