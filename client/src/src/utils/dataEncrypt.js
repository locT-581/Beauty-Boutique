import CryptoJS from "crypto-js";

export const dataEncrypt = (data) => {
  return CryptoJS.AES.encrypt(
    data,
    process.env.REACT_APP_CRYPTO_SECRET_KEY
  ).toString();
};

export const dataDecrypt = (data) => {
  return CryptoJS.AES.decrypt(
    data,
    process.env.REACT_APP_CRYPTO_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};
