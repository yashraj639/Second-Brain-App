import { ContentCard } from "./content-card";
import type { ContentItem } from "../hooks/use-content";

export function ContentList({
  contents,
  onEdit,
  onDelete,
  onPreview,
  readonly,
}: {
  contents: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  onPreview: (item: ContentItem) => void;
  readonly?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((item) => (
        <ContentCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onPreview={onPreview}
          readonly={readonly}
        />
      ))}
    </div>
  );
}
