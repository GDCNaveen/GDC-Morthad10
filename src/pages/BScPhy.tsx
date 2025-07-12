import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import AuthCheck from "@/components/AuthCheck";

const BScPhy = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sample B.Sc Physical Sciences content
  const bscPhyContent = [
    {
      id: 1,
      type: "video" as const,
      title: "B.Sc Physics - Quantum Mechanics",
      description: "Introduction to quantum mechanics for physics students. This comprehensive session covers wave-particle duality, Heisenberg uncertainty principle, and Schrödinger equation. Essential concepts for understanding modern physics and atomic structure.",
      category: "B.Sc Phy Sci.",
      videoUrl: "https://player.vimeo.com/video/1095495803?h=55eac0fa5a&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: 2,
      type: "image" as const,
      title: "B.Sc Chemistry - Organic Chemistry Lab",
      description: "Hands-on organic chemistry laboratory experiments and procedures. Students learn about synthesis, purification, and characterization of organic compounds through practical laboratory work and analytical techniques.",
      category: "B.Sc Phy Sci.",
      imageUrl: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=800&h=450&fit=crop",
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
            {bscPhyContent.map((content) => (
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

export default BScPhy;