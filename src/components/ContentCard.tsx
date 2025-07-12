import { useState, useRef, useEffect } from "react";
import { School, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
  type: "video" | "image";
  title: string;
  description: string;
  category: string;
  videoUrl?: string;
  imageUrl?: string;
}

const ContentCard = ({ type, title, description, category, videoUrl, imageUrl }: ContentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for video control
  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Video is mostly visible
            setIsPlaying(true);
          } else {
            // Video is not visible or barely visible
            setIsPlaying(false);
            // Pause video by reloading iframe (simple approach)
            if (videoRef.current && isPlaying) {
              const currentSrc = videoRef.current.src;
              videoRef.current.src = "";
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.src = currentSrc;
                }
              }, 100);
            }
          }
        });
      },
      { threshold: [0.1, 0.5, 0.9] }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [type, isPlaying]);

  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + "..." 
    : description;

  const extractVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/video\/(\d+)/);
    return match ? match[1] : null;
  };

  const renderVideo = () => {
    if (!videoUrl) return null;

    // Handle Vimeo iframe
    if (videoUrl.includes("vimeo.com")) {
      return (
        <div className="relative w-full aspect-video">
          <iframe
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            title={title}
          />
          <div className="video-overlay">
            <span className="bg-black/70 px-2 py-1 rounded text-xs">
              {category}
            </span>
            <div className="college-logo w-8 h-8">
              <School className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderImage = () => {
    if (!imageUrl) return null;

    return (
      <div className="relative w-full aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="video-overlay">
          <span className="bg-black/70 px-2 py-1 rounded text-xs">
            {category}
          </span>
          <div className="college-logo w-8 h-8">
            <School className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={cardRef} className="w-full mb-6">
      {/* Video/Image Section */}
      <div className="w-full">
        {type === "video" ? (
          <div className="relative w-full aspect-video">
            <iframe
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              title={title}
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Category Section */}
      <div className="gradient-bg text-white px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">{category}</span>
        <div className="college-logo w-8 h-8">
          <School className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 bg-white">
        <h3 className="gradient-text font-semibold text-lg mb-2 leading-tight">
          {title}
        </h3>
        
        <div className="text-gray-700 text-sm leading-relaxed text-justify">
          {isExpanded ? description : truncatedDescription}
          
          {description.length > 150 && (
            <Button
              variant="link"
              className="p-0 h-auto ml-2 text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Read Less <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;