import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const checkTokenExpiration = (): boolean => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  const decoded = jwtDecode<DecodedToken>(token);
  const expirationTime = decoded.exp * 1000;
  const timeLeft = expirationTime - Date.now();

  if (timeLeft <= 0) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.href = "/auth/login";
    return false;
  } else {
    setTimeout(() => {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/auth/login";
    }, timeLeft);
    return true;
  }
};

export default checkTokenExpiration;
