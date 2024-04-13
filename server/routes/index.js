import usersRoute from "./usersRoute.js";
import productsRoute from "./productsRoute.js";
import blogsRoute from "./blogRoute.js";
import billsRoute from "./billRoute.js";

const route = (app) => {
  app.use("/api/v1/user", usersRoute);
  app.use("/api/v1/product", productsRoute);
  app.use("/api/v1/blog", blogsRoute);
  app.use("/api/v1/bill", billsRoute);
};

export default route;
