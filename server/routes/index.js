import usersRoute from "./usersRoute.js";
import productsRoute from "./productsRoute.js";
import blogsRoute from "./blogRoute.js";

const route = (app) => {
  app.use("/api/v1/user", usersRoute);
  app.use("/api/v1/product", productsRoute);
  app.use("/api/v1/blog", blogsRoute);
};

export default route;
