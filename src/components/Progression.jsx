import { useState } from "react";
import { PageHeader } from "./Shared";

const phases = [
  {
    id: "p1", label: "Phase 1", weeks: "S1 – S2", name: "Fondation Neuronale", icon: "🧱",
    color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10",
    description: "Apprentissage des patterns moteurs, maîtrise des techniques d'intensification de base. Charges conservatrices pour ancrer la technique avant d'augmenter l'intensité.",
    intensity: "75–82% 1RM", volume: "Standard (pas de techniques avancées sur S1)", deload: false,
    days: [
      { tag: "J1 Push A", exercises: [{ name: "Développé couché haltères", sets: "4", reps: "6", charge: "~78% 1RM", tech: "Wave Loading : 6/6/5/5" }, { name: "Développé incliné barre", sets: "4", reps: "6–7", charge: "~75% 1RM", tech: "—" }, { name: "Dips lestés", sets: "3", reps: "8", charge: "Lest modéré", tech: "Rest-Pause S2 uniquement" }, { name: "Pushdown câble corde", sets: "3", reps: "12", charge: "~65% 1RM", tech: "Drop set S2 uniquement" }] },
      { tag: "J2 Pull A", exercises: [{ name: "Tirage poitrine prise large", sets: "4", reps: "6", charge: "~78% 1RM", tech: "Cluster Sets S2 : 2+2+2" }, { name: "Rowing barre", sets: "4", reps: "6–7", charge: "~75% 1RM", tech: "—" }, { name: "Rowing unilatéral haltère", sets: "3", reps: "10", charge: "~65% 1RM", tech: "Myo-reps S2 : 3 mini-sets" }] },
      { tag: "J3 Legs A", exercises: [{ name: "Leg Press 45°", sets: "5", reps: "6", charge: "~78% 1RM", tech: "Wave Loading S2 : 6/6/5/5/4" }, { name: "Leg curl couché", sets: "4", reps: "8", charge: "~75% 1RM", tech: "Rest-Pause S2 uniquement" }, { name: "Hip Thrust barre", sets: "3", reps: "10", charge: "~70% 1RM", tech: "—" }] },
      { tag: "J4 Push B", exercises: [{ name: "Développé militaire haltères", sets: "5", reps: "6", charge: "~78% 1RM", tech: "Wave Loading S2 : 6/6/5/5/4" }, { name: "Élévations latérales câble", sets: "4", reps: "12", charge: "~65% 1RM", tech: "Myo-reps S2 : 3 mini-sets" }, { name: "Shrugs haltères", sets: "3", reps: "10", charge: "~75% 1RM", tech: "Cluster Sets S2 : 3+3+2" }] },
      { tag: "J5 Full Body", exercises: [{ name: "SDT roumain haltères", sets: "5", reps: "6", charge: "~78% 1RM", tech: "Wave Loading S2 : 6/6/5/5/4" }, { name: "Tirage horizontal câble", sets: "4", reps: "6–7", charge: "~75% 1RM", tech: "Cluster Sets S2 : 3+2+2" }, { name: "Développé prise serrée", sets: "4", reps: "6–7", charge: "~75% 1RM", tech: "—" }] },
    ]
  },
  {
    id: "p2", label: "Phase 2", weeks: "S3 – S4", name: "Progression Intensive", icon: "📈",
    color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10",
    description: "Augmentation des charges (+2.5 kg sur composés, +1.25 kg sur isolation). Toutes les techniques d'intensification actives. Volume légèrement augmenté sur les exercices secondaires.",
    intensity: "82–88% 1RM", volume: "Toutes techniques actives · +1 mini-set sur Myo-reps", deload: false,
    days: [
      { tag: "J1 Push A", exercises: [{ name: "Développé couché haltères", sets: "4", reps: "5–6", charge: "+2.5 kg vs S1–S2", tech: "Wave Loading : 6/5/5/4/4" }, { name: "Dips lestés", sets: "3", reps: "6–8", charge: "+lest 2.5 kg", tech: "Rest-Pause : 2 pauses" }, { name: "Pushdown câble corde", sets: "3", reps: "10–12", charge: "+1.25 kg", tech: "Drop set : 2 drops" }] },
      { tag: "J2 Pull A", exercises: [{ name: "Tirage poitrine prise large", sets: "4", reps: "5–6", charge: "+2.5 kg", tech: "Cluster Sets : 3+2+2" }, { name: "Rowing unilatéral haltère", sets: "3", reps: "8–10", charge: "+1.25 kg", tech: "Myo-reps : 4 mini-sets" }, { name: "Curl marteau câble", sets: "3", reps: "10–12", charge: "+1.25 kg", tech: "Drop set S4" }] },
      { tag: "J3 Legs A", exercises: [{ name: "Leg Press 45°", sets: "5", reps: "5–6", charge: "+5 kg vs S1–S2", tech: "Wave Loading : 6/5/5/4/4" }, { name: "Leg curl couché", sets: "4", reps: "6–8", charge: "+2.5 kg", tech: "Rest-Pause : 2 pauses" }, { name: "Hip Thrust barre", sets: "3", reps: "8–10", charge: "+2.5 kg", tech: "—" }] },
      { tag: "J4 Push B", exercises: [{ name: "Développé militaire haltères", sets: "5", reps: "5–6", charge: "+2.5 kg", tech: "Wave Loading : 6/5/5/4/4" }, { name: "Élévations latérales câble", sets: "4", reps: "10–12", charge: "+1.25 kg", tech: "Myo-reps : 4 mini-sets" }, { name: "Shrugs haltères", sets: "3", reps: "8–10", charge: "+2.5 kg", tech: "Cluster Sets : 3+3+2" }] },
      { tag: "J5 Full Body", exercises: [{ name: "SDT roumain haltères", sets: "5", reps: "5–6", charge: "+2.5 kg", tech: "Wave Loading : 6/5/5/4/4" }, { name: "Tirage horizontal câble", sets: "4", reps: "5–7", charge: "+2.5 kg", tech: "Cluster Sets : 3+2+2" }, { name: "Développé prise serrée", sets: "4", reps: "5–7", charge: "+2.5 kg", tech: "Rest-Pause S4" }] },
    ]
  },
  {
    id: "p3", label: "Phase 3", weeks: "S5 – S6", name: "Pic de Force & Déload", icon: "🏆",
    color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10",
    description: "S5 : intensité maximale du cycle (88–92% 1RM), techniques poussées à leur maximum. S6 : déload structuré (–30% volume, –15% charge) pour consolidation neuromusculaire.",
    intensity: "S5 : 88–92% 1RM · S6 Déload : 65–70% 1RM", volume: "S5 : volume max · S6 : –30% séries, zéro techniques", deload: true,
    days: [
      { tag: "J1–J5 Semaine 5", exercises: [{ name: "Développé couché haltères", sets: "4–5", reps: "4–5", charge: "+2.5 kg vs S3–S4", tech: "Wave Loading : 5/4/4/3/3" }, { name: "Tous composés", sets: "+0.5 série", reps: "4–5", charge: "+2.5 kg vs S3–S4", tech: "Toutes techniques à leur max" }] },
      { tag: "Tous jours S6 — Déload", exercises: [{ name: "DÉLOAD SEMAINE 6", sets: "–30%", reps: "8–12", charge: "–15% sur toutes les charges", tech: "AUCUNE technique d'intensification" }, { name: "Focus technique parfaite", sets: "—", reps: "—", charge: "65–70% 1RM", tech: "Connexion neuromusculaire, mobilité" }, { name: "Récupération active", sets: "—", reps: "—", charge: "—", tech: "Étirements, sommeil prioritaire" }] },
    ]
  }
];

const globalRules = [
  { icon: "📏", rule: "Augmentation des charges composés : +2.5 kg toutes les 2 semaines si toutes les reps sont complétées avec bonne technique" },
  { icon: "🔬", rule: "Augmentation isolation : +1.25 kg toutes les 2 semaines (câbles, machines)" },
  { icon: "🦵", rule: "Leg Press : progression +5 kg/2 semaines (amplitude constante ≤80°, genou surveillé)" },
  { icon: "⚠️", rule: "Si une charge ne peut pas être complétée 2 séances consécutives : rester au même poids et travailler la technique" },
  { icon: "🛡️", rule: "Douleur articulaire (genou, coude G, lombaires) : réduire la charge de 10% immédiatement" },
  { icon: "😴", rule: "Sommeil <7h : réduire le volume de 20% cette séance, pas de nouvelles charges maximales" },
  { icon: "🔄", rule: "Après S6 (déload) : recommencer le cycle avec les charges de fin S5 comme nouvelles bases" },
];

function PhaseCard({ phase, isOpen, onToggle }) {
  const [openDay, setOpenDay] = useState(null);
  return (
    <div className={`border rounded-lg mb-3 overflow-hidden ${phase.border} ${phase.bg}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-2 p-3 text-left hover:bg-white/5 transition-all">
        <span className="text-xl">{phase.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold text-sm ${phase.color}`}>{phase.label} — {phase.weeks}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded border ${phase.border} ${phase.color}`}>{phase.name}</span>
            {phase.deload && <span className="text-xs px-1.5 py-0.5 rounded border border-green-500/30 text-green-400 bg-green-500/10">Déload S6</span>}
          </div>
          <div className="text-slate-500 text-xs mt-0.5">{phase.intensity}</div>
        </div>
        <span className={`text-slate-500 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-3 pb-3 border-t border-slate-700/50 pt-3 space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">{phase.description}</p>
          <div className="bg-slate-800/60 border border-slate-700 rounded p-2 text-xs">
            <span className="text-slate-400 font-semibold">Volume : </span>
            <span className="text-slate-300">{phase.volume}</span>
          </div>
          {phase.days.map((day, di) => (
            <div key={di} className="border border-slate-700 rounded-lg overflow-hidden">
              <button onClick={() => setOpenDay(openDay === di ? null : di)} className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 transition-all">
                <span className={`text-xs font-bold ${phase.color}`}>{day.tag}</span>
                <span className="text-slate-500 text-xs">{openDay === di ? "▲" : "▼"}</span>
              </button>
              {openDay === di && (
                <div className="divide-y divide-slate-800">
                  {day.exercises.map((ex, ei) => (
                    <div key={ei} className="px-3 py-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-xs font-semibold text-slate-200">{ex.name}</span>
                        <span className="text-slate-500 text-xs ml-auto">{ex.sets}×{ex.reps}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 mt-0.5">
                        <span className="text-xs text-slate-500">⚖️ {ex.charge}</span>
                        {ex.tech !== "—" && <span className={`text-xs ${phase.color}`}>⚡ {ex.tech}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Progression() {
  const [openPhase, setOpenPhase] = useState("p1");

  return (
    <div className="max-w-2xl mx-auto p-3">
      <PageHeader part="📈 FICHE PROGRESSION — 6 SEMAINES" subtitle="3 phases · Charges · Volume · Techniques · Déload" />

      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
        {["S1","S2","S3","S4","S5","S6"].map((s, i) => (
          <div key={i} className="flex items-center gap-1 flex-shrink-0">
            <div className={`text-center px-2 py-1.5 rounded text-xs font-bold border ${i < 2 ? "border-violet-500/40 bg-violet-500/10 text-violet-400" : i < 4 ? "border-red-500/40 bg-red-500/10 text-red-400" : i === 4 ? "border-amber-500/40 bg-amber-500/10 text-amber-400" : "border-green-500/40 bg-green-500/10 text-green-400"}`}>
              {s}
              <div className="text-xs font-normal mt-0.5 opacity-70">{i < 2 ? "Fond." : i < 4 ? "Prog." : i === 4 ? "Pic" : "Déload"}</div>
            </div>
            {i < 5 && <div className="w-3 h-px bg-slate-700 flex-shrink-0" />}
          </div>
        ))}
      </div>

      {phases.map((phase) => (
        <PhaseCard key={phase.id} phase={phase} isOpen={openPhase === phase.id} onToggle={() => setOpenPhase(openPhase === phase.id ? null : phase.id)} />
      ))}

      <div className="mt-2 border border-slate-700 bg-slate-800/40 rounded-lg p-3">
        <div className="text-xs font-bold text-slate-300 mb-2">📋 RÈGLES DE PROGRESSION GLOBALES</div>
        <ul className="space-y-2">
          {globalRules.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="flex-shrink-0">{r.icon}</span>
              <span className="leading-relaxed">{r.rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 border border-green-500/30 bg-green-500/10 rounded p-2 text-xs text-green-300">
        <span className="font-semibold">✅ Fin du cycle 6 semaines</span><br />
        Après le déload (S6) : reprendre les charges maximales atteintes en S5 comme nouvelles bases de départ.
      </div>
    </div>
  );
}
