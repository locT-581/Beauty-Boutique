import dotenv from "dotenv";

import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { authClient } from "../config/firebaseConfig.js";

import sendCookie from "../utils/sendCookie.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "../middlewares/catchAsync.js";

dotenv.config();

//  Sign Up User
export const signupUser = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  const { email, fullName, password, phoneNumber, address, city } = req.body;

  const userCollection = db.collection("users");

  // Format phone number (change 0 to +84)
  let newPhoneNumber = phoneNumber;
  if (phoneNumber.charAt(0) === "0") {
    newPhoneNumber = "+84" + phoneNumber.slice(1);
  }
  const newUser = {
    email,
    fullName,
    password,
    phoneNumber: newPhoneNumber,
    address,
    city,
    cart: [],
  };

  // Add user into Authentication service
  getAuth()
    .createUser(newUser)
    .then((userRecord) => {
      const { password, ...newUser1 } = newUser;
      const userDB = {
        uid: userRecord.uid,
        timestamp: FieldValue.serverTimestamp(),
        ...newUser1,
      };
      // Add user into Database
      userCollection
        .doc(userRecord.uid)
        .set(userDB)
        .then(() => {
          console.log("Add user successfully ");
          res.status(200).json({
            success: true,
            user: userDB,
          });
        })
        .catch((error) => {
          console.log("Error when add user into Firestore:", error);
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
      switch (error.code) {
        case "auth/email-already-exists":
          return res.status(400).json({
            code: error.code,
            message: "Email đã được sử dụng",
          });
        case "auth/phone-number-already-exists":
          return res.status(400).json({
            code: error.code,
            message: "Số điện thoại đã được sử dụng",
          });
        case "auth/invalid-email":
          return res.status(400).json({
            code: error.code,
            message: "Email không hợp lệ",
          });
        case "auth/invalid-password":
          return res.status(400).json({
            code: error.code,
            message: "Mật khẩu phải có ít nhất 6 ký tự",
          });
        case "auth/invalid-phone-number":
          return res.status(400).json({
            code: error.code,
            message: "Số điện thoại không hợp lệ",
          });
        default:
          return res.status(400).json({
            code: error.code,
            message: "Đã có lỗi xảy ra!",
          });
      }
    });
});

// Login User
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(authClient, email, password)
    .then((userCredential) => {
      // Signed in client
      const user = userCredential.user;
      console.log("User client: ");
      console.log(userCredential._tokenResponse.idToken);
      console.log("=====================================");

      // Check user in Firestore
      const db = getFirestore();
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.empty) {
            return next(new ErrorHandler("User doesn't exist", 401));
          }
          sendCookie(
            { idToken: userCredential._tokenResponse.idToken, ...doc.data() },
            201,
            res
          );
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("Error: ");
      console.log(errorMessage);
      return res.status(400).json({
        code: errorMessage,
        message: "Hãy kiểm tra lại email hoặc mật khẩu của bạn!",
      });
    });
});

//Logout
export const logoutUser = catchAsync(async (req, res, next) => {
  // logout in client
  signOut(authClient)
    .then(() => {
      console.log("Sign out successfully");
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Đăng xuất thành công!",
      });
    })
    .catch((error) => {
      console.log("Error when sign out: ", error);
      return res.status(400).json(error);
    });
});

// // Update password
// export const updatePassword = catchAsync(async (req, res, next) => {
//   const { oldPassword, newPassword } = req.body;

//   //Find user in db
//   const user = await User.findById(req.user._id).select("+password");

//   // Check old password match
//   const isPasswordMatched = await user.comparePassword(oldPassword);

//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid Old Password", 401));
//   }

//   // Update new password
//   user.password = newPassword;
//   // Update to db
//   await user.save();

//   sendCookie(user, 201, res);
// });

// // Update profile
// export const updateProfile = catchAsync(async (req, res, next) => {
//   const { displayName, description } = req.body;
//   const newUserData = {
//     displayName,
//     description,
//   };
//   // If have avatar
//   if (req.body.avatar) {
//     const user = await User.findById(req.user._id);
//     const imageId = user.avatar.public_id;
//     if (imageId) {
//       // Delete old image
//     }
//     // Up avatar
//     const avatarURL = ''
//     newUserData.avatar = {
//       public_id: avatarURL,
//       url: avatarURL,
//     };
//   }

//   await User.findByIdAndUpdate(req.user._id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: true,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// Delete profile
export const deleteProfile = catchAsync(async (req, res, next) => {
  const user = req.user;
  //Delete user in Authentication
  getAuth()
    .deleteUser(user.uid)
    .then(() => {
      console.log("Successfully deleted user");
      // Delete user in Firestore
      const db = getFirestore();
      db.collection("users")
        .doc(user.uid)
        .delete()
        .then(() => {
          console.log("Successfully deleted user in Firestore");
          //Delete cookie
          res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          });
          // Return response
          res.status(200).json({
            success: true,
            message: "Profile Deleted",
          });
        })
        .catch((error) => {
          console.log("Error deleting user in Firestore:", error);
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
      return res.status(400).json(error);
    });
});

// Get user - Check Logged In user
export const getAccountDetails = catchAsync(async (req, res, next) => {
  const user = req.user;
  // Get user from Firestore
  const db = getFirestore();
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.empty) {
        return next(new ErrorHandler("User Not Found", 404));
      }
      const { password, ...user } = doc.data();
      res.status(200).json({
        success: true,
        user,
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      return res.status(400).json(error);
    });
});

// export const forgotPassword = catchAsync(async (req, res, next) => {
//   const email = req.body.email;
//   const user = await User.findOne({ email });

//   const clientURL = req.headers.referer;
//   const parsedURL = new URL(clientURL);
//   const clientHost = parsedURL.host;

//   if (!user) {
//     return next(new ErrorHandler("User Not Found", 404));
//   }

//   const resetPasswordToken = await user.getToken();

//   await user.save();

//   // Link to UI to reset pass
//   const resetPasswordUrl = `https://${clientHost}/password/reset/${resetPasswordToken}`;

//   try {
//     sendMail({ email, username: user.userName, link: resetPasswordUrl });
//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${email}`,
//     });
//   } catch (error) {
//     user.confirmToken = undefined;
//     user.confirmExpiry = undefined;

//     await user.save({ validateBeforeSave: false });
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// export const resetPassword = catchAsync(async (req, res, next) => {
//   // Get token
//   const confirmToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     confirmToken,
//     confirmExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(new ErrorHandler("User Not Found", 404));
//   }

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();
//   sendCookie(user, 200, res);
// });

export const getLocations = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  db.collection("cities")
    .get()
    .then((snapshot) => {
      const locations = [];
      snapshot.forEach((doc) => {
        locations.push({ id: doc.id, ...doc.data() });
      });
      console.log(locations);
      res.status(200).json({
        success: true,
        cities: locations,
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      return res.status(400).json(error);
    });
});

export const updateLocation = catchAsync(async (req, res, next) => {
  const cities = req.body;
  const db = getFirestore();
  const citiesCollection = db.collection("cities");
  cities.forEach((city, i) => {
    citiesCollection
      .doc(city.id.toString())
      .set({ name: city.division_name })
      .then(() => {
        console.log("Add city successfully ");
      })
      .catch((error) => {
        console.log("Error when add city into Firestore:", error);
        return res.status(400).json(error);
      });
  });
  res.status(200).json({
    success: true,
    message: "Add city successfully",
  });
});
