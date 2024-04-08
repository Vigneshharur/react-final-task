import { fetchUsersFromDB, saveUserDetails } from "../http";
import { userActions } from "./user-slice";

export function fetchUsers() {
  return async (dispatch) => {
    try {
      const userData = await fetchUsersFromDB();
      if (userData) {
        dispatch(userActions.replaceUsers(userData));
      }
    } catch (error) {
      if (error === TypeError) {
        fetchUsers();
      }
      alert("ETHO ERROR!!");
    }
  };
}

export function sendUsers(users) {
  return () => {
    try {
      saveUserDetails(users);
    } catch (e) {
      alert("ETHO Error");
    }
  };
}
