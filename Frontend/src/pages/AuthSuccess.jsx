import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      try {
        const user = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("JWT decode failed:", err);
      }
    }

    navigate("/");
  }, [navigate]);

  return <div>Signing you in...</div>;
}
