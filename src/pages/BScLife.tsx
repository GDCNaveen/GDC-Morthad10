import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import AuthCheck from "@/components/AuthCheck";

const BScLife = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sample B.Sc Life Sciences content
  const bscLifeContent = [
    {
      id: 1,
      type: "video" as const,
      title: "B.Sc Life Sciences - Cell Biology",
      description: "Comprehensive study of cell structure and function for life science students. This detailed session covers cell organelles, membrane transport, cellular metabolism, and cell division processes. Essential foundation for understanding advanced biological concepts.",
      category: "B.Sc Life Sci.",
      videoUrl: "https://player.vimeo.com/video/1095510347?h=adbdfa174b&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: 2,
      type: "image" as const,
      title: "B.Sc Life Sciences - Botany Lab",
      description: "Practical botany laboratory sessions focusing on plant anatomy and physiology. Students learn about plant tissues, photosynthesis, and plant reproduction through hands-on experiments and microscopic observations.",
      category: "B.Sc Life Sci.",
      imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop",
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
            {bscLifeContent.map((content) => (
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

export default BScLife;