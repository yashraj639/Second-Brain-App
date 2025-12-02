import { useAtom } from "jotai";
import { authAtom } from "../hooks/atom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShareOne } from "../../icons/svg-icons";
import { ShareModal } from "../content/share-modal";

export const Header = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, username: null });
    navigate("/signin");
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#D7C9B8] flex items-center justify-center text-white">
          SB
        </div>
        <h1 className="font-serif text-2xl  text-[#222222]">
          Welcome {auth.username}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2EFEB] border border-[#E4E1DD] text-[#6C6A69] hover:bg-[#E4E1DD] transition-colors"
        >
          <ShareOne className="w-5 h-5" />
          <span className="text-sm font-medium">Share Brain</span>
        </button>

        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2EFEB] border border-[#E4E1DD] text-[#6C6A69] hover:bg-[#E4E1DD] transition-colors"
        >
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </header>
  );
};
