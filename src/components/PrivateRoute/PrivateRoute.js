import React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { userStore } from "../../stores/UserStore";

const PrivateRoute = observer(({ children }) => {
  return userStore.isLoggedIn ? children : <Navigate to="/login" />;
});

export default PrivateRoute;
