import { useState, useEffect } from "react";
import { Download, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthCheck from "@/components/AuthCheck";

const Downloads = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sample download files
  const downloadFiles = [
    {
      id: 1,
      name: "College Prospectus 2024",
      type: "PDF",
      size: "2.5 MB",
      url: "#", // Replace with actual file URL
      icon: FileText,
    },
    {
      id: 2,
      name: "Application Form",
      type: "PDF",
      size: "1.2 MB",
      url: "#", // Replace with actual file URL
      icon: FileText,
    },
    {
      id: 3,
      name: "Academic Calendar",
      type: "PDF",
      size: "850 KB",
      url: "#", // Replace with actual file URL
      icon: FileText,
    },
    {
      id: 4,
      name: "Course Structure - B.A.",
      type: "Word",
      size: "3.1 MB",
      url: "#", // Replace with actual file URL
      icon: File,
    },
    {
      id: 5,
      name: "Course Structure - B.Com",
      type: "Word",
      size: "2.8 MB",
      url: "#", // Replace with actual file URL
      icon: File,
    },
    {
      id: 6,
      name: "Course Structure - B.Sc Life Sciences",
      type: "Word",
      size: "3.5 MB",
      url: "#", // Replace with actual file URL
      icon: File,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleDownload = (fileName: string, url: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AuthCheck>
      <div className="min-h-screen bg-background">
        <Header isVisible={headerVisible} />
        
        {/* Main Content */}
        <main className="pt-40 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="gradient-text text-3xl font-bold mb-4">Downloads</h2>
              <p className="text-gray-600 text-lg">Download important documents and forms</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {downloadFiles.map((file) => (
                <div key={file.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <file.icon className="w-8 h-8 text-primary mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{file.name}</h3>
                        <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleDownload(file.name, file.url)}
                    className="w-full gradient-bg text-white hover:opacity-90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Downloads;