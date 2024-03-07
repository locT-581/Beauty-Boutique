import { useDispatch } from "react-redux";
import Button from "../../../../UI/Button";
import { userLogoutAsync } from "../../../../redux/reducers/authSlice";
import { Link } from "react-router-dom";

function AdminMenu() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogoutAsync());
  };
  return (
    <div className="w-52 flex flex-col bg-white text-black py-1">
      <Link to="/quanlysanpham">
        <Button
          color="white"
          className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
        >
          Quản lý sản phẩm
        </Button>
      </Link>
      <hr />
      <Link to="/quanlybaiviet">
        <Button
          color="white"
          className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
        >
          Quản lý bài viết
        </Button>
      </Link>
      <hr />
      <Button
        onClick={handleLogout}
        color="white"
        className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
      >
        Đăng xuất
      </Button>
    </div>
  );
}

export default AdminMenu;
