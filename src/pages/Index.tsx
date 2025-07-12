import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import AuthCheck from "@/components/AuthCheck";

const Index = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // College information content for Home page
  const collegeContent = [
    {
      id: 1,
      type: "image" as const,
      title: "Government Degree College, Morthad - Campus Overview",
      description: "Welcome to Government Degree College, Morthad - a premier educational institution committed to excellence in higher education. Our beautiful campus spans across lush green acres, providing an ideal environment for learning and personal growth. Established with the vision of providing quality education to students from all backgrounds, our college stands as a beacon of knowledge and opportunity in the region.",
      category: "Campus",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop",
    },
    {
      id: 2,
      type: "image" as const,
      title: "NAAC 'B' Grade Accreditation - Quality Assurance",
      description: "We are proud to be accredited with NAAC 'B' Grade, a testament to our commitment to maintaining high standards in education, infrastructure, and student services. This accreditation reflects our dedication to continuous improvement in teaching-learning processes, research activities, and overall institutional development. Our NAAC accreditation ensures that students receive education that meets national quality standards.",
      category: "Accreditation",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
    },
    {
      id: 3,
      type: "image" as const,
      title: "Career Opportunities & Placement Support",
      description: "Our college provides comprehensive career guidance and placement support to help students achieve their professional goals. We maintain strong industry connections and regularly organize career counseling sessions, skill development workshops, and placement drives. Our alumni have successfully placed in various government and private sector organizations, making us proud of their achievements.",
      category: "Careers",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=450&fit=crop",
    },
    {
      id: 4,
      type: "image" as const,
      title: "Experienced Faculty & Academic Excellence",
      description: "Our dedicated faculty members bring years of academic and industry experience to the classroom. With advanced qualifications and a passion for teaching, they mentor students not just in academics but also in personal development. Our faculty regularly participates in professional development programs and research activities to stay updated with the latest educational trends and methodologies.",
      category: "Faculty",
      imageUrl: "https://images.unsplash.com/photo-1427751840561-9852520f8ce8?w=800&h=450&fit=crop",
    },
    {
      id: 5,
      type: "image" as const,
      title: "College Establishment & Legacy",
      description: "Established as an affiliate to Telangana University, Government Degree College, Morthad has been serving the educational needs of the community for many years. Our college was founded with the mission to provide accessible, quality higher education to students from diverse backgrounds. Over the years, we have grown to become one of the respected institutions in the region, maintaining high academic standards and contributing to the intellectual and social development of our students.",
      category: "History",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top
        setHeaderVisible(true);
      } else {
        // Scrolling down
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
          <div className="w-full">
            {collegeContent.map((content) => (
              <ContentCard
                key={content.id}
                type={content.type}
                title={content.title}
                description={content.description}
                category={content.category}
                imageUrl={content.imageUrl}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Index;
