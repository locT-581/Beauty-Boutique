import dotenv from "dotenv";

dotenv.config();

const sendCookie = (user = {}, statusCode, res) => {
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const { password, idToken, ...userWithoutPassword } = user;

  res.status(statusCode).cookie("token", user.idToken, options).json({
    success: true,
    user: userWithoutPassword,
  });
};

export default sendCookie;
