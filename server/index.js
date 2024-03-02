import dotenv from "dotenv";

import app from "../server/app.js";
import { firebaseServerApp } from "./config/firebaseConfig.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

//init firebaseServerApp
firebaseServerApp();

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
