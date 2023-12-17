import { memo } from "react";
import useSelector from "../../hooks/use-selector";
import { Navigate } from "react-router-dom";

function AuthUser({ children }) {
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));

  if (!select.isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default memo(AuthUser);
