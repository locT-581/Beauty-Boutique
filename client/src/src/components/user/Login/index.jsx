import Button from "../../../UI/Button";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAsync } from "../../../redux/reducers/authSlice";
import { CircularProgress } from "@mui/material";
import SignIn from "../Signin";
import { closeBackDrop, showBackDrop } from "../../../redux/reducers/uiSlice";
import CloseIcon from "@mui/icons-material/Close";
function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authSlice);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    if (e.target.value.includes("@") || e.target.value.includes(".")) {
      const error = document.getElementById("email-error");
      if (error) error.remove();
    }
    setEmail(e.target.value.trim());
  };
  const handleChangePassword = (e) => {
    if (e.target.value.length >= 6) {
      const error = document.getElementById("password-error");
      if (error) error.remove();
    }
    setPassword(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove error message
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    if (emailError) emailError.remove();
    if (passwordError) passwordError.remove();

    // check email valid
    if (!email.includes("@") && !email.includes(".")) {
      const error = document.createElement("span");
      error.textContent = "Email không hợp lệ";
      error.classList.add("text-pink", "text-sm", "mt-1", "ml-4");
      error.id = "email-error";
      document.getElementById("email").parentElement.appendChild(error);
      console.log("Email không hợp lệ");
      return;
    }
    // Check and password
    if (password.length < 6) {
      const error = document.createElement("span");
      error.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
      error.classList.add("text-pink", "text-sm", "mt-1", "ml-4");
      error.id = "password-error";
      document.getElementById("password").parentElement.appendChild(error);
      console.log("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    dispatch(userLoginAsync({ email, password }));
  };
  const handleChangeSignUpPage = () => {
    dispatch(showBackDrop({ element: <SignIn /> }));
  };
  const handleCloseBackDrop = () => {
    dispatch(closeBackDrop());
  };

  return (
    <div className="relative w-[45vw] bg-white text-black p-8 flex flex-col justify-center items-center">
      <CloseIcon
        onClick={handleCloseBackDrop}
        color="inherit"
        className="cursor-pointer absolute top-5 right-6 mr-[2%] hover:text-pink"
      />
      <h3 className="text-4xl text-center mt-3">Đăng nhập</h3>
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex flex-col justify-center items-center mt-8 px-[2%]"
      >
        <div className="w-full px-[4%] mt-5 ">
          <label htmlFor="email" className="block mb-1">
            <span className="text-pink">*</span>Email/Số điện thoại
          </label>
          <input
            onChange={handleChangeEmail}
            value={email}
            placeholder="contact@beauty.com / 0123456789"
            required
            type="email | tel"
            id="email"
            className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
          />
        </div>
        <div className="w-full px-[4%] mt-5 ">
          <label htmlFor="password" className="block mb-1">
            <span className="text-pink">*</span>Mật khẩu
          </label>
          <input
            autoComplete="new-password"
            onChange={handleChangePassword}
            value={password}
            required
            type="password"
            id="password"
            className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
          />
        </div>
        <div className="w-full flex justify-end mt-2">
          <span className="text-sm italic font-medium cursor-pointer hover:underline">
            Quên mật khẩu?
          </span>
        </div>
        <div className="mt-6">
          <span>
            Chưa có tài khoản? &nbsp;
            <button
              type="button"
              onClick={handleChangeSignUpPage}
              className="hover:underline cursor-pointer font-semibold"
            >
              Đăng kí ngay!
            </button>
          </span>
        </div>
        <div>
          <Button
            type="submit"
            className={"flex items-center justify-center px-12 py-2 mt-2"}
          >
            {loading ? (
              <CircularProgress color="inherit" size="24px" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </div>
        <div className="flex flex-col text-center justify-center items-center">
          <span className="my-3">Hoặc</span>
          <div className="flex items-center">
            <span>Đăng nhập bằng</span>
            <GoogleIcon
              className="cursor-pointer mx-3 hover:scale-110"
              fontSize="medium"
            />
            <AppleIcon
              className="cursor-pointer mx-3 hover:scale-125 scale-110 -mt-[2px]"
              fontSize="medium"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
