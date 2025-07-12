import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { School } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const validCredentials = [
        { username: "Naveen", password: "123", role: "user" },
        { username: "Admin", password: "123", role: "admin" }
      ];

      const user = validCredentials.find(
        (cred) => cred.username === username && cred.password === password
      );

      if (user) {
        // Set expiry date: 31-12-2025 08:00:00 AM
        const expiryDate = new Date("2025-12-31T08:00:00");
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("username", user.username);
        localStorage.setItem("loginExpiry", expiryDate.toISOString());

        toast({
          title: "Login Successful",
          description: `Welcome ${user.username}!`,
        });

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="college-logo mx-auto mb-4">
            <School className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="gradient-text text-xl">
            Government Degree College, Morthad
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Accredited with NAAC 'B' Grade<br />
            (Affiliate to Telangana University)
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full gradient-bg text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-xs text-center text-muted-foreground">
            <p>Valid until: December 31, 2025 - 8:00 AM</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;