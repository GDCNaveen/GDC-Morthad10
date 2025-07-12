import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const expiryString = localStorage.getItem("loginExpiry");

      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      if (expiryString) {
        const expiryDate = new Date(expiryString);
        const now = new Date();

        if (now >= expiryDate) {
          // Session expired
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userRole");
          localStorage.removeItem("username");
          localStorage.removeItem("loginExpiry");
          
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please login again.",
            variant: "destructive",
          });
          
          navigate("/login");
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();

    // Check every minute for expiry
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, [navigate, toast]);

  if (isChecking) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-center">
          <div className="college-logo mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;