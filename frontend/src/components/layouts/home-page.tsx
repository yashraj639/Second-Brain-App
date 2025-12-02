import { Dashboard } from "./dashboard";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export default function CalmSecondBrain() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#222222] antialiased">
      <div className="max-w-[1400px] mx-auto pt-10">
        <Header />
        <main className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 mt-6">
          <Sidebar />
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
