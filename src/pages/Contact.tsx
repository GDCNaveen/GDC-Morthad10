import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Globe, Clock, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthCheck from "@/components/AuthCheck";

const Contact = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <AuthCheck>
      <div className="min-h-screen bg-background">
        <Header isVisible={headerVisible} />
        
        {/* Main Content */}
        <main className="pt-40 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="gradient-text text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 text-lg">Get in touch with our institution</p>
            </div>

            {/* Institution Details */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="gradient-text text-2xl font-bold mb-6 text-center">Government Degree College, Morthad</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                      <p className="text-gray-600">
                        Government Degree College, Morthad<br />
                        Telangana, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600">+91 9948954811</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">gdcmorthad@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Globe className="w-6 h-6 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Website</h4>
                      <p className="text-gray-600">www.gdcmorthad.edu</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Office Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="w-6 h-6 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Affiliation</h4>
                      <p className="text-gray-600">
                        Telangana University<br />
                        NAAC 'B' Grade Accredited
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Personnel */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Principal */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="college-logo w-16 h-16 mx-auto mb-3">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="gradient-text text-xl font-bold">Dr. T. Peddanna</h3>
                  <p className="text-gray-600 font-medium">Principal (FAC)</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">+91 9948954811</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">gdcmorthad@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-purple-500 mr-3" />
                    <span className="text-gray-700">www.gdcmorthad.edu</span>
                  </div>
                </div>
              </div>

              {/* Faculty Coordinator */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="college-logo w-16 h-16 mx-auto mb-3">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="gradient-text text-xl font-bold">Naveen</h3>
                  <p className="text-gray-600 font-medium">TSKC FTM</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">+91 9494719306</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">algotnaveen@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-purple-500 mr-3" />
                    <span className="text-gray-700">www.algotnaveen.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Contact;