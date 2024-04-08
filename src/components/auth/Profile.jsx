import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkValidLogin } from "../../http";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const userId = useSelector((state) => state.auth.credential.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    // if (!checkValidLogin()) {
    //   navigate("/logout");
    //   return;
    // }
  }, [userId]);

  const users = useSelector((state) => state.user.users);
  const userArray = users.filter((user) => user.id === userId);
  let loggedUser = undefined;
  if (userArray.length === 1) {
    loggedUser = userArray[0];
  }
  return (
    <>
      {loggedUser && (
        <ol
          id="profile-view"
          style={{ backgroundColor: "lightpink", color: "green" }}
        >
          <li>
            <span>Name: </span>
            {loggedUser.fname + " " + loggedUser.lname}
          </li>
          <li>
            <span>Email: </span>
            {loggedUser.email}
          </li>
          <br />
          <li>
            <span>
              <NavLink style={{ color: "blue", padding: "0px" }} to="/cart">
                Your Cart
              </NavLink>
            </span>
          </li>
        </ol>
      )}
    </>
  );
}
