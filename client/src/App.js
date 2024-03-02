import { Fragment, Suspense } from "react";
import Logo from "./UI/Icon/LogoSpin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { privateRouter, publicRouter } from "./routes";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <Logo width="80" className={"fill-slate-600"} />
        </div>
      }
    >
      <ToastContainer />
      <Routes>
        {publicRouter.map((route, index) => {
          let Layout = Fragment;
          let Page = route.element;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRouter.map((route, index) => {
          let Layout = Fragment;
          let Page = route.element;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
