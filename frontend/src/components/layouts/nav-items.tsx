export const NavItem = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
        active ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center text-sm ${
            active ? "bg-[#D7C9B8] text-white" : "bg-white text-[#222222]"
          }`}
        >
          {label[0].toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs text-[#6C6A69]">
            {count ?? 0} {count === 1 ? "item" : "items"}
          </div>
        </div>
      </div>
      <div className="text-sm text-[#6C6A69]">›</div>
    </div>
  );
};

export const TagPill = ({ label }: { label: string }) => {
  return (
    <div className="px-2 py-1 rounded-md text-xs border border-[#E4E1DD] text-[#6C6A69] bg-[#F8F6F2]">
      {label}
    </div>
  );
};
