import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.authSlice
  );
  return (
    <>
      {loading === false &&
        (isAuthenticated === true && user.isAdmin ? (
          children
        ) : (
          <Navigate to="/trang-chu" />
        ))}
    </>
  );
};

export default PrivateRoute;
