import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import Button from "../../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import addressAPI from "../../../apis/addressAPI";
import {
  loadUserAsync,
  userSignupAsync,
} from "../../../redux/reducers/authSlice";
import { closeBackDrop, showBackDrop } from "../../../redux/reducers/uiSlice";
import Login from "../Login";
import CloseIcon from "@mui/icons-material/Close";

function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authSlice);
  const [cities, setCities] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await addressAPI.getCities();
        setCities(data.cities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };
  const handleCityChange = (e) => {
    console.log(e.target.value);
    setUserForm({ ...userForm, city: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      const err = document.getElementById("isChecked-error");
      if (err) err.remove();
    }
    setIsChecked((pre) => !pre);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordError = document.getElementById("password-error");
    if (passwordError) passwordError.remove();
    const confirmPasswordError = document.getElementById(
      "confirmPassword-error"
    );
    if (confirmPasswordError) confirmPasswordError.remove();
    const isCheckedError = document.getElementById("isChecked-error");
    if (isCheckedError) isCheckedError.remove();

    // Check and password
    if (userForm.password.length < 6) {
      const error = document.createElement("span");
      error.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
      error.classList.add("text-pink", "text-sm", "mt-1", "ml-4");
      error.id = "password-error";
      document.getElementById("password").parentElement.appendChild(error);
      document.getElementById("password").focus();
      return;
    }
    // Check confirm password
    if (userForm.password !== userForm.confirmPassword) {
      const error = document.createElement("span");
      error.textContent = "Mật khẩu không khớp";
      error.classList.add("text-pink", "text-sm", "mt-1", "ml-4");
      error.id = "confirmPassword-error";
      document
        .getElementById("confirmPassword")
        .parentElement.appendChild(error);
      document.getElementById("confirmPassword").focus();
      return;
    }
    // Check isChecked
    if (!isChecked) {
      const error = document.createElement("span");
      error.textContent = "Bạn chưa đồng ý với điều khoản dịch vụ";
      error.classList.add("text-pink", "text-sm", "mt-1", "ml-4");
      error.id = "isChecked-error";
      document
        .getElementById("isChecked")
        .parentElement.parentElement.appendChild(error);
      return;
    }
    dispatch(userSignupAsync(userForm));
    dispatch(loadUserAsync());
    console.log(userForm);
  };
  const handleChangeLoginPage = () => {
    dispatch(showBackDrop({ element: <Login /> }));
  };
  const handleCloseBackDrop = () => {
    dispatch(closeBackDrop());
  };
  return (
    <div className="relative w-[55vw] bg-white text-black p-8 flex flex-col justify-center items-center">
      <CloseIcon
        onClick={handleCloseBackDrop}
        color="inherit"
        className="cursor-pointer absolute top-5 right-6 mr-[2%] hover:text-pink"
      />
      <h3 className="text-4xl text-center mt-3">Đăng kí tài khoản</h3>
      <form
        onSubmit={handleSubmit}
        className="w-[85%] flex flex-col justify-center items-center mt-5 px-[2%]"
      >
        <div className="w-full flex">
          <div className="w-1/2">
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="email" className="block mb-1">
                <span className="text-pink">*</span>Họ tên
              </label>
              <input
                value={userForm.fullName}
                onChange={handleChange}
                autoComplete="off"
                required
                type="text"
                id="fullName"
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
              />
            </div>
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="password" className="block mb-1">
                <span className="text-pink">*</span>Email
              </label>
              <input
                value={userForm.email}
                onChange={handleChange}
                required
                type="email"
                id="email"
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
              />
            </div>
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="password" className="block mb-1">
                <span className="text-pink">*</span>Mật khẩu
              </label>
              <input
                value={userForm.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                type="password"
                id="password"
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
              />
            </div>
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="password" className="block mb-1">
                <span className="text-pink">*</span>Xác nhận mật khẩu
              </label>
              <input
                value={userForm.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="email" className="block mb-1">
                <span className="text-pink">*</span>Số điện thoại
              </label>
              <input
                value={userForm.phoneNumber}
                onChange={handleChange}
                autoComplete="off"
                required
                type="text"
                id="phoneNumber"
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
              />
            </div>
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="password" className="block mb-1">
                <span className="text-pink">*</span>Địa chỉ
              </label>
              <input
                value={userForm.address}
                onChange={handleChange}
                required
                type="text"
                id="address"
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none "
              />
            </div>
            <div className="w-full px-[4%] mt-5 ">
              <label htmlFor="city" className="block mb-1 mt-5">
                <span className="text-pink">*</span>Thành phố
              </label>
              <select
                name="city"
                id="city"
                value={userForm.city}
                onChange={handleCityChange}
                className="w-full border border-gray-500 py-[4px] px-4 rounded-full outline-none"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full px-[4%] mt-11 text-sm">
              <label htmlFor="isChecked" className="flex item-start">
                <input
                  className="cursor-pointer mx-3 "
                  id="isChecked"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <span>Bằng việc đăng kí, bạn đã đồng ý về</span>
                  <span className="flex">
                    <div className="font-bold hover:underline cursor-pointer">
                      điều khoản dich vụ
                    </div>{" "}
                    &nbsp; & &nbsp;
                    <div className="font-bold hover:underline cursor-pointer">
                      chính sách bảo mật
                    </div>
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <span>
            Đã có tài khoản? &nbsp;
            <button
              onClick={handleChangeLoginPage}
              type="button"
              className="hover:underline cursor-pointer"
            >
              Đăng nhập ngay!
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
              "Đăng kí"
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

export default SignIn;
