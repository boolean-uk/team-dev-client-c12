import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { createProfile, login, register } from "../service/apiClient";
import Navigation from "../components/navigation";
import Header from "../components/header";
import Modal from "../components/modal";
import ERR from "../service/errors.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const useClickOutside = (ref, onClickOutside) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          onClickOutside();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClickOutside]);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      navigate(location?.pathname || "/");
    }
  }, [location?.pathname]);

  const handleLogin = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error(ERR.ENTER_EMAIL_PASSWORD);
          }
          const validatedEmail = validationEmail(email);
          if (!validatedEmail) {
            throw new Error(ERR.EMAIL_ERROR_MESSAGE);
          }
    
          const validatedPassword = validationPassword(password);
          if (!validatedPassword) {
            throw new Error(ERR.PASSWORD_REQUIRMENTS);
          }
      const res = await login(email, password);

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate(location.state?.from?.pathname || "/");
        setError(null);
        return;
      }
      setUser({ ...res.data.user });
      setError(ERR.LOGIN_FAILED);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError("");
  };

  const handleRegister = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error(ERR.ENTER_EMAIL_PASSWORD);
      }
      const validatedEmail = validationEmail(email);
      if (!validatedEmail) {
        throw new Error(ERR.EMAIL_ERROR_MESSAGE);
      }

      const validatedPassword = validationPassword(password);
      if (!validatedPassword) {
        throw new Error(ERR.PASSWORD_REQUIRMENTS);
      }
      const res = await register(email, password);
      if (res.data.error) {
        setError(res.data.error);
        return;
      }
      localStorage.setItem("token", res.data.token);
      setUser({ ...res.data.user });
      setToken(res.data.token);
      navigate("/verification");
      setError(ERR.REGISTRATION_FAILED);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateProfile = async (
    firstName,
    lastName,
    username,
    githubUsername,
    mobile,
    bio
  ) => {
    try {
      const { userId } = jwt_decode(token);

      const res = await createProfile(
        userId,
        firstName,
        lastName,
        username,
        githubUsername,
        mobile,
        bio
      );

      if (res.status === "success") {
        navigate("/");
        return;
      }
      setError(ERR.PROFILE_CREATION_FAILED);
    } catch (error) {
      setError(ERR.PROFILE_CREATION_FAILED);
    }
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile,
    error,
    setError,
    useClickOutside,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children, disabledNav = false }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (disabledNav) {
    return (
      <div className="container">
        <Header />
        <Navigation disabledNav />
        <Modal />
        {children}
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

function validationEmail(email) {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return !email || !emailPattern.test(email) ? false : true;
}

function validationPassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length < minLength ||
    !hasUppercase ||
    !hasNumber ||
    !hasSpecialCharacter
    ? false
    : true;
}

export { AuthContext, AuthProvider, ProtectedRoute };
