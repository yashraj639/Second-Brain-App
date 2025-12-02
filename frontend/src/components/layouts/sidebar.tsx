import { NavItem, TagPill } from "./nav-items";
import { useContent, filterAtom } from "../hooks/use-content";
import { useAtom } from "jotai";

export const Sidebar = () => {
  const { contents } = useContent();
  const [filter, setFilter] = useAtom(filterAtom);

  const counts = {
    tweet: 0,
    youtube: 0,
    document: 0,
    link: 0,
  };

  contents.forEach((item) => {
    if (item.type in counts) {
      counts[item.type as keyof typeof counts]++;
    }
  });

  return (
    <aside className="rounded-2xl bg-[#F2EFEB] p-4 border border-[#E4E1DD] shadow-[0_8px_20px_rgba(34,34,34,0.03)] h-full">
      <nav className="flex flex-col gap-2">
        <NavItem
          label="All"
          count={contents.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <NavItem
          label="Tweets"
          count={counts.tweet}
          active={filter === "tweet"}
          onClick={() => setFilter("tweet")}
        />
        <NavItem
          label="Videos"
          count={counts.youtube}
          active={filter === "youtube"}
          onClick={() => setFilter("youtube")}
        />
        <NavItem
          label="Documents"
          count={counts.document}
          active={filter === "document"}
          onClick={() => setFilter("document")}
        />
        <NavItem
          label="Links"
          count={counts.link}
          active={filter === "link"}
          onClick={() => setFilter("link")}
        />

        <div className="mt-4 border-t border-[#E4E1DD] pt-4">
          <h4 className="text-xs text-[#6C6A69] uppercase tracking-wider mb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            <TagPill label="productivity" />
            <TagPill label="philosophy" />
            <TagPill label="frontend" />
          </div>
        </div>
      </nav>
    </aside>
  );
};
