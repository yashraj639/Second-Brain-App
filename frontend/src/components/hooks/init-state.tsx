import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "./atom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function InitState() {
  const setAuth = useSetAtom(authAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("token");
      if (!token) {
        if (
          location.pathname !== "/signup" &&
          location.pathname !== "/signin"
        ) {
          navigate("/signin");
        }
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/users/me",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        if (response.data.name) {
          setAuth({ token: token, username: response.data.name });
          if (
            location.pathname === "/signin" ||
            location.pathname === "/signup" ||
            location.pathname === "/"
          ) {
            navigate("/dashboard");
          }
        } else {
          navigate("/signin");
        }
      } catch (e) {
        console.error(e);
        navigate("/signin");
      }
    }
    init();
  }, []);

  return null;
}
