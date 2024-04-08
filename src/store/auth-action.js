import { authActions } from "./auth-slice";

export function fetchAuth() {
  return (dispatch) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData) {
        dispatch(authActions.replaceAuth(authData));
      }
    } catch (error) {
      alert("ETHO ERROR!!");
    }
  };
}

export function addAuth(user, isAdmin) {
  return (dispatch) => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 10);
    localStorage.setItem("expiration", expiration);
    const credential = {
      user,
      isAdmin,
    };
    localStorage.setItem("auth", JSON.stringify(credential));
    dispatch(authActions.setUser(credential));
  };
}

export function getTokenDuration() {
  const expiration = localStorage.getItem("expiration");

  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
