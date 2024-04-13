import { useDispatch } from "react-redux";
import Button from "../../../../UI/Button";
import { userLogoutAsync } from "../../../../redux/reducers/authSlice";

function Authenticated() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogoutAsync());
  };
  return (
    <div className="w-52 flex flex-col bg-white text-black py-1">
      <Button
        color="white"
        className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
      >
        Tài khoản
      </Button>
      <hr />
      <Button
        color="white"
        className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
      >
        Lịch sử
      </Button>
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

export default Authenticated;
