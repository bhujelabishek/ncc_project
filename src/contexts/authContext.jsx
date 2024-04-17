import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res.access_token);
      if (res.access_token) {
        setToken(res.access_token);
        localStorage.setItem("token", res.access_token);
        navigate("/todo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("token");
    toast("Successfully logged out");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};







