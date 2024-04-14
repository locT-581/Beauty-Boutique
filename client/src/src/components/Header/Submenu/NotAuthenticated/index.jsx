import { useDispatch } from "react-redux";
import Button from "../../../../UI/Button";
import Login from "../../../user/Login";
import SignIn from "../../../user/Signin";
import { showBackDrop } from "../../../../redux/reducers/uiSlice";

function NotAuthenticated() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(showBackDrop({ element: <Login /> }));
  };
  const handleSignup = () => {
    dispatch(showBackDrop({ element: <SignIn /> }));
  };
  return (
    <div className="w-52 flex flex-col bg-white text-black py-1">
      <Button
        onClick={handleLogin}
        color="white"
        className="w-full hover:bg-soft-pink hover:text-black text-base font-fontCabin px-6 py-2 text-start"
      >
        Đăng nhập
      </Button>
      <hr />
      <Button
        onClick={handleSignup}
        color="white"
        className="w-full hover:bg-soft-pink hover:text-black text-start text-base font-fontCabin px-6 py-2"
      >
        Đăng ký
      </Button>
    </div>
  );
}

export default NotAuthenticated;
