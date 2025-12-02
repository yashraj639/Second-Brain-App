import { atom, useAtom } from "jotai";
import { authAtom } from "./atom";
import axios from "axios";
import { useEffect } from "react";

export interface ContentItem {
  _id: string;
  type: "tweet" | "youtube" | "document" | "link";
  link: string;
  title: string;
  tags: string[];
  excerpt?: string;
  metadata?: {
    title: string;
    description: string;
    image: string;
  };
}

export const contentsAtom = atom<ContentItem[]>([]);
export const filterAtom = atom<
  "all" | "tweet" | "youtube" | "document" | "link"
>("all");

import { BACKEND_URL } from "../../config";

export function useContent() {
  const [{ token }] = useAtom(authAtom);
  const [contents, setContents] = useAtom(contentsAtom);

  async function refresh() {
    if (!token) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/content/fetch`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContents(res.data.contents || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  useEffect(() => {
    refresh();
  }, [token]);

  return { contents, refresh };
}
