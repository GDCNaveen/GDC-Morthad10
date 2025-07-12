import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication on app load
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const currentPath = location.pathname;

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && currentPath !== "/login") {
      navigate("/login");
    }
    
    // If authenticated and on login page, redirect to home
    if (isAuthenticated && currentPath === "/login") {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

export default AppWrapper;