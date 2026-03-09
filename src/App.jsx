import { useState } from "react";

import Complements from "./components/Complements";
import Intensification from "./components/Intensification";
import Part1 from "./components/Part1";
import Part2 from "./components/Part2";
import Part3 from "./components/Part3";
import Progression from "./components/Progression";

const pages = [
  { id: "p1", label: "J1–J2", icon: "💪", desc: "Push A · Pull A" },
  { id: "p2", label: "J3–J4", icon: "🦵", desc: "Legs · Push B" },
  { id: "p3", label: "J5", icon: "🏋️", desc: "Full Body" },
  { id: "int", label: "Techniques", icon: "⚡", desc: "Intensification" },
  { id: "prog", label: "Progression", icon: "📈", desc: "6 Semaines" },
  { id: "comp", label: "Compléments", icon: "💊", desc: "Nutrition" },
];

export default function App() {
  const [activePage, setActivePage] = useState("p1");

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 z-50">
        <div className="flex max-w-2xl mx-auto">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-all ${
                activePage === p.id ? "text-red-400" : "text-slate-600 hover:text-slate-400"
              }`}
            >
              <span className="text-base">{p.icon}</span>
              <span className="text-xs font-semibold mt-0.5">{p.label}</span>
              <span className="text-xs opacity-60 hidden sm:block">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Page content with bottom padding for nav */}
      <div className="pb-20">
        {activePage === "p1" && <Part1 />}
        {activePage === "p2" && <Part2 />}
        {activePage === "p3" && <Part3 />}
        {activePage === "int" && <Intensification />}
        {activePage === "prog" && <Progression />}
        {activePage === "comp" && <Complements />}
      </div>
    </div>
  );
}
