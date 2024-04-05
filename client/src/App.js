import { Fragment, Suspense, useEffect, useState } from "react";
import Logo from "./UI/Icon/LogoSpin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { privateRouter, publicRouter } from "./routes";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { socket } from "./socket";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.authSlice);
  const { pathname } = useLocation();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join", { userId: user.uid });
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
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
                    <Page title={route.title} />
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
