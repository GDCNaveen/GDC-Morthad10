import { useState, useEffect } from "react";
import { Menu, School, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isVisible: boolean;
}

const Header = ({ isVisible }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "B.A.", path: "/ba" },
    { name: "B.Com", path: "/bcom" },
    { name: "B.Sc Life Sci.", path: "/bsc-life" },
    { name: "B.Sc Phy Sci.", path: "/bsc-phy" },
    { name: "Downloads", path: "/downloads" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("loginExpiry");
    navigate("/login");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        {/* Top Section with Menu and Logo */}
        <div className="flex items-center justify-between mb-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="header-gradient h-full">
                <div className="p-4 border-b border-white/20 flex justify-end">
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <X className="w-5 h-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="p-4">
                  <ul className="space-y-3">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-white/20"
                          onClick={() => {
                            navigate(item.path);
                            setIsOpen(false);
                          }}
                        >
                          {item.name}
                        </Button>
                      </li>
                    ))}
                    <li className="pt-4 border-t border-white/20">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="college-logo">
            <School className="w-8 h-8 text-primary" />
          </div>

          <div className="w-10" /> {/* Spacer for symmetry */}
        </div>

        {/* College Information */}
        <div className="text-center">
          <h1 className="gradient-text text-lg font-bold leading-tight">
            Government Degree College, Morthad
          </h1>
          <p className="gradient-text text-sm leading-tight">
            Accredited with NAAC 'B' Grade
          </p>
          <p className="gradient-text text-xs leading-tight">
            (Affiliate to Telangana University)
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;