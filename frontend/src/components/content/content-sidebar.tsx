import { motion, AnimatePresence } from "motion/react";
import {
  Twitter,
  Youtube,
  Document,
  BaselineLink,
  Close,
} from "../../icons/svg-icons";
import type { ContentItem } from "../hooks/use-content";
import { useEffect, useRef } from "react";

interface ContentSidebarProps {
  item: ContentItem | null;
  onClose: () => void;
}

export function ContentSidebar({ item, onClose }: ContentSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (item) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [item, onClose]);

  useEffect(() => {
    if (item?.type === "tweet") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [item]);

  if (!item) return null;

  const icon =
    item.type === "tweet" ? (
      <Twitter className="w-5 h-5" />
    ) : item.type === "youtube" ? (
      <Youtube className="w-5 h-5" />
    ) : item.type === "document" ? (
      <Document className="w-5 h-5" />
    ) : (
      <BaselineLink className="w-5 h-5" />
    );

  const tweetUrl = item.link
    ?.replace("https://x.com", "https://twitter.com")
    ?.replace("http://x.com", "https://twitter.com");

  const youtubeId = item.type === "youtube" ? getYoutubeId(item.link) : null;

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-gray-500 capitalize font-medium">
                  {icon}
                  {item.type}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Close className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h2 className="font-serif text-2xl font-bold mb-6 text-gray-900 leading-tight">
                {item.title}
              </h2>

              {item.type === "youtube" && youtubeId && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-sm">
                  <iframe
                    width="100%"
                    height="240"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {item.type === "tweet" && (
                <div className="mb-6">
                  <blockquote className="twitter-tweet">
                    <a href={tweetUrl}></a>
                  </blockquote>
                </div>
              )}

              {item.type === "link" && item.metadata && (
                <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
                  {item.metadata.image && (
                    <img
                      src={item.metadata.image}
                      alt={item.metadata.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {item.metadata.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.metadata.description}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Link
                </h3>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  {item.link}
                </a>

                {item.tags && item.tags.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mt-6">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getYoutubeId(link: string) {
  try {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
