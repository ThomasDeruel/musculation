export function PriorityStars({ level }) {
  return <span className="text-yellow-400 text-xs">{"⭐".repeat(level)}</span>;
}

export function ExerciseCard({ ex, accentColor = "text-red-400", mediumColor = "text-violet-400" }) {
  return (
    <div className="border border-slate-700 rounded-lg p-2 mb-2 bg-slate-800/60">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`font-semibold text-sm ${accentColor}`}>{ex.name}</span>
        <PriorityStars level={ex.priority} />
        <span className="text-slate-400 text-xs ml-auto">{ex.sets}×{ex.reps}</span>
        <span className="text-slate-500 text-xs">⏱ {ex.tempo}</span>
        <span className="text-slate-500 text-xs">💤 {ex.rest}</span>
      </div>
      {ex.technique && (
        <div className={`text-xs mt-1 px-2 py-1 rounded bg-slate-700/50 ${mediumColor}`}>
          ⚡ {ex.technique}
        </div>
      )}
      {ex.note && (
        <div className="text-xs mt-1 text-amber-400/80 italic">⚠️ {ex.note}</div>
      )}
    </div>
  );
}

export function PageHeader({ subtitle, part }) {
  return (
    <div className="mb-4 border-b border-slate-700 pb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🐰</span>
        <h1 className="text-lg font-bold text-red-400 tracking-wide">Smart Rabbit</h1>
        <span className="ml-auto text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded">
          FORCE • Intermédiaire
        </span>
      </div>
      <p className="text-slate-500 text-xs">5 séances/sem · 60 min · Salle · Adaptations genou / lombaires / coude G</p>
      {part && <p className="text-amber-400 text-xs mt-1 font-semibold">{part}</p>}
      {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
    </div>
  );
}

export function TabBar({ tabs, active, onChange, colorActive = "bg-red-500 text-white" }) {
  return (
    <div className="flex gap-1 mb-4">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 py-1.5 text-xs rounded font-semibold transition-all ${
            active === key ? colorActive : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function DayPanel({ day, accentColor = "text-red-400", mediumColor = "text-violet-400" }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className={`text-xs font-bold px-2 py-1 rounded ${accentColor} bg-red-500/10 border border-red-500/30`}>
          {day.tag}
        </div>
        <div className="text-slate-300 text-sm font-semibold">{day.focus}</div>
        <div className="ml-auto text-slate-500 text-xs">⏳ {day.duration}</div>
      </div>
      {day.exercises.map((ex, i) => (
        <ExerciseCard key={i} ex={ex} accentColor={accentColor} mediumColor={mediumColor} />
      ))}
    </div>
  );
}

export function TempoGuide() {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded p-2 mb-3 text-xs text-slate-400">
      <span className="text-slate-300 font-semibold">Tempo</span> : Excentrique – Pause basse – Concentrique – Pause haute (ex: 3-1-1-0)
    </div>
  );
}

export function Legend() {
  return (
    <div className="flex gap-3 mb-3 text-xs text-slate-500">
      <span>⭐⭐⭐ Fondamental</span>
      <span>⭐⭐ Secondaire</span>
      <span>⭐ Isolation</span>
    </div>
  );
}

export function TimingBox({ lines, total }) {
  return (
    <div className="mt-3 bg-slate-800/40 border border-slate-700 rounded p-2 text-xs">
      <div className="text-slate-300 font-semibold mb-1">⏱ Estimation durée</div>
      <div className="text-slate-400 space-y-0.5">
        {lines.map((l, i) => <div key={i}>{l}</div>)}
        <div className="text-red-400 font-semibold mt-1">{total}</div>
      </div>
    </div>
  );
}
