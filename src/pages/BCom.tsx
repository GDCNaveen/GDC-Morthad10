import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import AuthCheck from "@/components/AuthCheck";

const BCom = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sample B.Com content
  const bcomContent = [
    {
      id: 1,
      type: "video" as const,
      title: "B.Com Accounting Principles",
      description: "Fundamental accounting principles and practices for commerce students. This detailed session covers double-entry bookkeeping, trial balance preparation, and financial statement analysis. Essential for understanding business financial management and commercial accounting practices.",
      category: "B.Com",
      videoUrl: "https://player.vimeo.com/video/1095495803?h=55eac0fa5a&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: 2,
      type: "image" as const,
      title: "B.Com Business Studies",
      description: "Introduction to business management and entrepreneurship for commerce students. This comprehensive course covers business planning, marketing strategies, and financial management essential for future business leaders and entrepreneurs.",
      category: "B.Com",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
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
            {bcomContent.map((content) => (
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

export default BCom;