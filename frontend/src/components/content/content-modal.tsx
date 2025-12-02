import { useState, useEffect } from "react";
import type { ContentItem } from "../hooks/use-content";

export function ContentModal({
  open,
  initial,
  onSubmit,
  onClose,
}: {
  open: boolean;
  initial?: ContentItem | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [link, setLink] = useState(initial?.link || "");
  const [type, setType] = useState(initial?.type || "link");
  const [tags, setTags] = useState(initial?.tags?.join(", ") || "");

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || "");
      setLink(initial?.link || "");
      setType(initial?.type || "link");
      setTags(initial?.tags?.join(", ") || "");
    }
  }, [initial, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-[#F2EFEB] p-8 rounded-2xl border border-[#E4E1DD] shadow-xl w-full max-w-md">
        <h2 className="font-serif text-2xl mb-6">
          {initial ? "Edit Content" : "Add Content"}
        </h2>

        <label className="text-sm text-[#6C6A69]">Type</label>
        <select
          className="w-full mt-1 mb-4 p-3 bg-white rounded-xl border border-[#E4E1DD]"
          value={type}
          onChange={(e) => setType(e.target.value as ContentItem["type"])}
        >
          <option value="link">Link</option>
          <option value="youtube">YouTube</option>
          <option value="tweet">Tweet</option>
          <option value="document">Document</option>
        </select>

        <label className="text-sm text-[#6C6A69]">Title</label>
        <input
          className="w-full mt-1 mb-4 p-3 bg-white rounded-xl border border-[#E4E1DD]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm text-[#6C6A69]">Link</label>
        <input
          className="w-full mt-1 mb-4 p-3 bg-white rounded-xl border border-[#E4E1DD]"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <label className="text-sm text-[#6C6A69]">Tags (comma separated)</label>
        <input
          className="w-full mt-1 mb-6 p-3 bg-white rounded-xl border border-[#E4E1DD]"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E4E1DD] text-[#6C6A69]"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit({
                title,
                link,
                type,
                tags: tags.split(",").map((t) => t.trim()),
              })
            }
            className="px-4 py-2 rounded-xl bg-[#D7C9B8] text-white"
          >
            {initial ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
