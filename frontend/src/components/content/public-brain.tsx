import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContentList } from "./content-list";
import { ContentSidebar } from "./content-sidebar";
import type { ContentItem } from "../hooks/use-content";
import { BACKEND_URL } from "../../config";

export function PublicBrain() {
  const { hash } = useParams();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    async function fetchPublicBrain() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/brain/${hash}`);
        setContents(res.data.content);
        setUsername(res.data.name);
      } catch (err) {
        console.error("Failed to fetch public brain", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (hash) {
      fetchPublicBrain();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#222]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center flex-col gap-4">
        <h1 className="font-serif text-3xl text-[#222]">Brain not found</h1>
        <p className="text-[#6C6A69]">
          The link you followed may be broken, or the brain may have been made
          private.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#222222] antialiased">
      <div className="max-w-[1400px] mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#222222] flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#222222]">
              {username}'s Brain
            </h1>
          </div>
        </header>

        <main>
          <ContentList
            contents={contents}
            onEdit={() => {}}
            onDelete={() => {}}
            onPreview={(item) => setPreviewItem(item)}
            readonly={true}
          />
        </main>

        <ContentSidebar
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      </div>
    </div>
  );
}
