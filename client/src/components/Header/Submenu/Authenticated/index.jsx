import { useDispatch } from "react-redux";
import Button from "../../../../UI/Button";
import { userLogoutAsync } from "../../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Authenticated() {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogoutAsync());
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="w-52 flex flex-col bg-white text-black py-1">
      <Link to={`/tai-khoan/${user.uid}`}>
        <Button
          color="white"
          className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
        >
          Tài khoản
        </Button>
      </Link>
      <hr />
      {/* <Button
        color="white"
        className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
      >
        Lịch sử
      </Button>
      <hr /> */}
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

export default Authenticated;
