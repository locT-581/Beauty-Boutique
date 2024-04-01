import express from "express";
import { engine, create, ExpressHandlebars } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import morgan from "morgan";

import cors from "cors";

// import passport from "passport";
import errorMiddleware from "./middlewares/error.js";
import routes from "./routes/index.js";

const app = express();
// File path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "/resources/scss")));
app.use(
  morgan(
    ":remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms"
  )
);

//Route
routes(app);

//Template engine view
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "../client"));

// error middleware
app.use(errorMiddleware);

export default app;
