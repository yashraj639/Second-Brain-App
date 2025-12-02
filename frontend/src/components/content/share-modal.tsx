import { motion, AnimatePresence } from "motion/react";
import { Close } from "../../icons/svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { authAtom } from "../hooks/atom";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ open, onClose }: ShareModalProps) {
  const [{ token }] = useAtom(authAtom);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && token) {
      fetchShareLink();
    }
  }, [open, token]);

  async function fetchShareLink() {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/brain/share",
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const hash = res.data.hash;
      setLink(`${window.location.origin}/share/${hash}`);
    } catch (err) {
      console.error("Failed to fetch share link", err);
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (link) {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6 border border-[#E4E1DD]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#222]">
                Share Brain
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Close className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-[#6C6A69] mb-6">
              Share your entire collection with others. They will be able to
              view your content but not edit it.
            </p>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]"></div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={link || ""}
                  className="flex-1 px-4 py-2 rounded-xl bg-[#F8F6F2] border border-[#E4E1DD] text-[#6C6A69] text-sm outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 rounded-xl bg-[#222] text-white text-sm font-medium hover:bg-black transition-colors min-w-[100px]"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
