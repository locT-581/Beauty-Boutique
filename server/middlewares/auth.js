import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "../middlewares/catchAsync.js";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
/**
 * Check jwt token
 */
const isAuthenticated = catchAsync(async (req, res, next) => {
  // Get token from cookies
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Vui lòng đăng nhập!", 401));
  }
  // idToken from the client app
  getAuth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // Get user from database
      const db = getFirestore();
      db.collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.empty) {
            return next(
              new ErrorHandler("Please Login to Access, " + error, 401)
            );
          }
          req.user = doc.data();
          next();
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log("Error when verify token: ", error);
      return next(new ErrorHandler("Please Login to Access, " + error, 401));
    });
});
export default isAuthenticated;
