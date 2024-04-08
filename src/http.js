export async function saveProductDetails(product) {
  const response = await fetch(
    "https://react-final-task-51ba1-default-rtdb.firebaseio.com/products.json",
    {
      method: "put",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Headers": "Authorization",
      },
    }
  );

  if (response.ok) {
    return "Product added successfully";
  }

  throw new Error("Product not added");
}

export async function fetchProductsFromDB() {
  const response = await fetch(
    "https://react-final-task-51ba1-default-rtdb.firebaseio.com/products.json"
  );

  if (!response.ok) {
    throw new Error("Product not added");
  }

  const resData = await response.json();
  return resData;
}

export async function saveCartDetails(cart) {
  const response = await fetch(
    "https://react-final-task-51ba1-default-rtdb.firebaseio.com/carts.json",
    {
      method: "put",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Headers": "Authorization",
      },
    }
  );

  if (response.ok) {
    return "Cart updated successfully";
  }

  throw new Error("Cart is not updated");
}

export async function fetchCartsFromDB() {
  const response = await fetch(
    "https://react-final-task-51ba1-default-rtdb.firebaseio.com/carts.json"
  );

  if (!response.ok) {
    throw new Error("Cart not updated");
  }

  const resData = await response.json();
  return resData;
}

export function generateAuthToken() {
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + 10);
  localStorage.setItem("expiration", expiration.toISOString());
  return expiration;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export async function saveUserDetails(cart) {
  const response = await fetch(
    "https://react-final-task-51ba1-default-rtdb.firebaseio.com/users.json",
    {
      method: "put",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Headers": "Authorization",
      },
    }
  );

  if (response.ok) {
    return "Cart updated successfully";
  }

  throw new Error("Cart is not updated");
}

export async function fetchUsersFromDB() {
  const response = await fetch(
    "https://react-final-task-51ba1-default-rtdb.firebaseio.com/users.json"
  );

  if (!response.ok) {
    throw new Error("Cart not updated");
  }

  const resData = await response.json();
  return resData;
}

export function checkValidLogin() {
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return false;
  }
  return true;
}
