import { useState } from "react";
import { useContent } from "../hooks/use-content";
import { ContentList } from "../content/content-list";
import { ContentModal } from "../content/content-modal";
import { ContentSidebar } from "../content/content-sidebar";
import axios from "axios";
import { useAtom } from "jotai";
import { authAtom } from "../hooks/atom";
import { filterAtom } from "../hooks/use-content";
import type { ContentItem } from "../hooks/use-content";

export function Dashboard() {
  const { contents, refresh } = useContent();
  const [{ token }] = useAtom(authAtom);
  const [filter] = useAtom(filterAtom);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);

  const filteredContents =
    filter === "all"
      ? contents
      : contents.filter((item) => item.type === filter);

  async function handleDelete(id: string) {
    await axios.delete(`http://localhost:3000/api/content/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    refresh();
  }

  async function handleSubmit(data: any) {
    if (editItem) {
      await axios.put(
        `http://localhost:3000/api/content/update/${editItem._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      await axios.post(`http://localhost:3000/api/content/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setModalOpen(false);
    setEditItem(null);
    refresh();
  }

  return (
    <div className="py-6">
      <div className="flex justify-between mb-8">
        <h2 className="font-serif text-3xl">Your Library</h2>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#F2EFEB] border border-[#E4E1DD] text-[#222222] text-sm"
        >
          Add Content
        </button>
      </div>

      <ContentList
        contents={filteredContents}
        onEdit={(item) => {
          setEditItem(item);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        onPreview={(item) => setPreviewItem(item)}
      />

      <ContentModal
        open={modalOpen}
        initial={editItem}
        onSubmit={handleSubmit}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
      />

      <ContentSidebar item={previewItem} onClose={() => setPreviewItem(null)} />
    </div>
  );
}
