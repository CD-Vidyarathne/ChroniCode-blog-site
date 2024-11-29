import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const checkTokenExpiration = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  const decoded = jwtDecode<DecodedToken>(token);
  const expirationTime = decoded.exp * 1000;
  const timeLeft = expirationTime - Date.now();

  if (timeLeft <= 0) {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  } else {
    setTimeout(() => {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }, timeLeft);
  }
};

export default checkTokenExpiration;
