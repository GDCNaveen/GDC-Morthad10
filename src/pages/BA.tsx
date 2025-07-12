import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import AuthCheck from "@/components/AuthCheck";

const BA = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sample B.A. content
  const baContent = [
    {
      id: 1,
      type: "video" as const,
      title: "B.A. English Literature - Poetry Analysis",
      description: "Naveen - Comprehensive analysis of English poetry covering various literary periods. This session explores the works of renowned poets, their techniques, themes, and historical context. Students will learn about metaphors, symbolism, and literary devices used in classical and modern poetry.",
      category: "B.A.",
      videoUrl: "https://player.vimeo.com/video/1095510347?h=adbdfa174b&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: 2,
      type: "image" as const,
      title: "B.A. History - Ancient Civilizations",
      description: "Study of ancient civilizations and their contributions to modern society. This comprehensive overview covers the rise and fall of great empires, cultural exchanges, and the development of political systems that shaped our world today.",
      category: "B.A.",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
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

  return (
    <AuthCheck>
      <div className="min-h-screen bg-background">
        <Header isVisible={headerVisible} />
        
        <main className="pt-40 pb-8">
          <div className="w-full">
            {baContent.map((content) => (
              <ContentCard
                key={content.id}
                type={content.type}
                title={content.title}
                description={content.description}
                category={content.category}
                videoUrl={content.videoUrl}
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

export default BA;
