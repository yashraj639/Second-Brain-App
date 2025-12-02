import { motion } from "motion/react";
import {
  Twitter,
  Youtube,
  Document,
  BaselineLink,
} from "../../icons/svg-icons";
import { useEffect } from "react";
import type { ContentItem } from "../hooks/use-content";
import { getYoutubeThumbnail } from "../../utils";

export function ContentCard({
  item,
  onEdit,
  onDelete,
  onPreview,
  readonly,
}: {
  item: ContentItem;
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  onPreview: (item: ContentItem) => void;
  readonly?: boolean;
}) {
  useEffect(() => {
    if (item.type === "tweet") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [item.type]);

  const icon =
    item.type === "tweet" ? (
      <Twitter />
    ) : item.type === "youtube" ? (
      <Youtube />
    ) : item.type === "document" ? (
      <Document />
    ) : (
      <BaselineLink />
    );

  const youtubeThumbnail =
    item.type === "youtube" ? getYoutubeThumbnail(item.link) : null;

  const tweetUrl = item.link
    ?.replace("https://x.com", "https://twitter.com")
    ?.replace("http://x.com", "https://twitter.com");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl bg-white p-5  shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => onPreview(item)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-light capitalize">
          {icon}
          {item.type}
        </div>

        {!readonly && (
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="text-sm text-brain-text-light hover:underline"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item._id);
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <h3 className="font-serif text-xl mb-4 text-brain-text">{item.title}</h3>

      {youtubeThumbnail && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={youtubeThumbnail}
            className="w-full h-40 rounded-lg mb-4 object-cover bg-brain-secondary"
          />
        </a>
      )}

      {item.type === "tweet" && (
        <blockquote className="twitter-tweet">
          <a href={tweetUrl}></a>
        </blockquote>
      )}

      {item.type === "link" && item.metadata && (
        <div className="mb-4 border border-brain-border rounded-lg overflow-hidden">
          {item.metadata.image && (
            <img
              src={item.metadata.image}
              alt={item.metadata.title}
              className="w-full h-32 object-cover"
            />
          )}
          <div className="p-3 bg-brain-bg">
            <h4 className="font-bold text-sm text-brain-text mb-1 line-clamp-1">
              {item.metadata.title}
            </h4>
            <p className="text-xs text-brain-text-light line-clamp-2">
              {item.metadata.description}
            </p>
          </div>
        </div>
      )}

      {item.excerpt && (
        <p className="text-sm text-brain-text-light mb-4 leading-relaxed">
          {item.excerpt}
        </p>
      )}

      <div className="flex gap-2 flex-wrap mt-auto">
        {item.tags?.map((t) => (
          <span
            key={t}
            className="text-xs text-light bg-brain-bg px-2 py-1 rounded-md bg-[#F2EFEB]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
