import { redirect, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.removeItem("auth");
  useEffect(() => {
    dispatch(authActions.setUser({ user: undefined, isAdmin: false }));
    navigate("/login");
  });
  return <p>Logout</p>;
}
