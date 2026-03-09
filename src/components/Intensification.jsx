import { useState } from "react";
import { PageHeader } from "./Shared";

const techniques = [
  {
    id: "wave", name: "Wave Loading", icon: "🌊", category: "Force Maximale", priority: "high",
    usedOn: ["J1 · Développé couché haltères", "J4 · Développé militaire haltères", "J5 · Soulevé de terre roumain"],
    objective: "Potentialisation post-activation — chaque vague recalibre le SNC vers le haut, permettant de soulever plus lourd qu'en séries classiques.",
    mechanism: "La fatigue perçue diminue entre les vagues grâce à la potentialisation : le SNC 'apprend' la charge et recrute davantage d'unités motrices à la vague suivante.",
    implementation: ["Vague 1 : 6 reps @ ~80% 1RM", "Vague 2 : 5 reps @ ~83% 1RM", "Vague 3 : 5 reps @ ~85% 1RM", "Vague 4 : 4 reps @ ~87% 1RM", "Vague 5 : 4 reps @ ~88% 1RM", "Repos entre vagues : 3 min"],
    safety: "Ne pas dépasser 90% 1RM en Phase 1 (S1–S2). Augmenter la charge de départ de 2.5 kg toutes les 2 semaines.",
    progression: "S1–S2 : 5 vagues / S3–S4 : charge +2.5 kg / S5–S6 : tenter une 6e vague"
  },
  {
    id: "cluster", name: "Cluster Sets", icon: "🔗", category: "Force & Volume", priority: "high",
    usedOn: ["J2 · Tirage poitrine prise large", "J4 · Shrugs haltères", "J5 · Tirage horizontal câble"],
    objective: "Maintenir la vitesse de barre et la qualité technique sur des intensités élevées (>85% 1RM) en fractionnant les séries avec des micro-pauses.",
    mechanism: "Les 15 secondes de pause permettent une resynthèse partielle de la phosphocréatine (~60%), retardant l'accumulation de fatigue centrale et préservant le recrutement des fibres de type II.",
    implementation: ["Choisir une charge @ ~85–87% 1RM", "Effectuer 2–3 reps, poser la barre", "Pause 15 sec (sans quitter la position)", "Répéter 2–3 fois (total : 6–9 reps)", "Repos complet : 2 min 30–3 min entre séries", "Exemple tirage : 3+2+2 = 7 reps total"],
    safety: "Conserver une technique irréprochable sur chaque mini-cluster. Si la vitesse de barre chute >30%, arrêter.",
    progression: "S1–S2 : 2+2+2 / S3–S4 : 3+2+2 / S5–S6 : 3+3+2 ou charge +2.5 kg"
  },
  {
    id: "restpause", name: "Rest-Pause", icon: "⏸️", category: "Volume Intensifié", priority: "medium",
    usedOn: ["J1 · Dips lestés", "J3 · Leg curl couché", "J5 · Leg press unilatéral"],
    objective: "Augmenter le volume effectif sans allonger la durée de séance. Prolonge le travail au-delà de l'échec musculaire momentané.",
    mechanism: "Après l'échec, 15 sec de repos permettent une récupération partielle des filières ATP-CP. Les reps supplémentaires recrutent les unités motrices à seuil élevé que la fatigue avait temporairement désactivées.",
    implementation: ["Effectuer la série jusqu'à l'échec technique (ex: 8 reps)", "Poser la charge — pause 15 sec", "Reprendre : viser 3–5 reps supplémentaires", "Option : 2e pause 15 sec + 2–3 reps finales", "Uniquement sur la DERNIÈRE série de l'exercice", "Repos après : 2 min minimum"],
    safety: "Réservé aux exercices où la technique reste contrôlable à la fatigue. Jamais sur les composés lourds. Idéal sur machines et câbles.",
    progression: "S1–S2 : 1 pause / S3–S4 : 2 pauses / S5–S6 : 2 pauses + charge +2.5 kg"
  },
  {
    id: "myoreps", name: "Myo-Reps", icon: "🔁", category: "Hypertrophie & Force", priority: "medium",
    usedOn: ["J2 · Rowing unilatéral haltère", "J4 · Élévations latérales câble"],
    objective: "Maximiser le nombre de reps effectuées près de l'échec (zone d'activation maximale) en un minimum de temps.",
    mechanism: "Contrairement au Rest-Pause classique, les Myo-reps utilisent une 'activation set' initiale pour pré-fatiguer le muscle, puis enchaînent des mini-séries de 3–5 reps avec 20–30 sec de repos.",
    implementation: ["Activation set : 12–15 reps @ ~65–70% 1RM (proche échec)", "Pause 20–30 sec (respirer, ne pas s'asseoir)", "Mini-série 1 : 3–5 reps", "Pause 20–30 sec", "Mini-série 2 : 3–5 reps", "Répéter 3–5 fois ou jusqu'à ne plus tenir 3 reps", "Repos final : 90 sec"],
    safety: "Technique adaptée aux exercices d'isolation et aux câbles. Pas recommandé sur les mouvements multi-articulaires lourds avec lombaires ou genou fragilisés.",
    progression: "S1–S2 : 3 mini-séries / S3–S4 : 4 mini-séries / S5–S6 : 5 mini-séries ou charge +5%"
  },
  {
    id: "dropset", name: "Drop Set", icon: "📉", category: "Volume & Finition", priority: "low",
    usedOn: ["J1 · Pushdown câble corde", "J3 · Leg extension quadriceps", "J5 · Curl biceps câble barre EZ"],
    objective: "Prolonger la série au-delà de l'échec en réduisant la charge, maximisant l'afflux sanguin et le stimulus métabolique en fin de séance.",
    mechanism: "La réduction de charge (–20%) permet de continuer à recruter les fibres musculaires malgré la fatigue locale, amplifiant le stress métabolique et la signalisation anabolique (mTOR, IGF-1) sans surcharger les tendons.",
    implementation: ["Effectuer la série principale jusqu'à l'échec technique", "Réduire immédiatement la charge de 20% (sans repos)", "Continuer jusqu'au nouvel échec", "Option : 2e drop (–20% supplémentaire) pour les exercices d'isolation", "Uniquement sur la DERNIÈRE série de l'exercice", "Repos après drop set : 90 sec minimum"],
    safety: "Idéal sur machines et câbles. Éviter sur les barres libres en solo. Ne jamais drop-setter les exercices où les lombaires ou le genou sont sous charge.",
    progression: "S1–S2 : 1 drop (–20%) / S3–S4 : 2 drops / S5–S6 : 2 drops + charge de départ +5%"
  }
];

const priorityConfig = {
  high: { label: "Intensité haute", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  medium: { label: "Intensité moyenne", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  low: { label: "Finition", color: "text-slate-400", bg: "bg-slate-700/30", border: "border-slate-600" }
};

function TechniqueCard({ tech, isOpen, onToggle }) {
  const p = priorityConfig[tech.priority];
  return (
    <div className={`border rounded-lg mb-3 overflow-hidden ${p.border} ${p.bg}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-2 p-3 text-left hover:bg-white/5 transition-all">
        <span className="text-xl">{tech.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold text-sm ${p.color}`}>{tech.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded border ${p.border} ${p.color}`}>{tech.category}</span>
          </div>
          <div className="text-slate-500 text-xs mt-0.5">{tech.usedOn.join(" · ")}</div>
        </div>
        <span className={`text-slate-500 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-3 pb-3 space-y-3 border-t border-slate-700/50 pt-3">
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1">🎯 OBJECTIF</div>
            <p className="text-xs text-slate-300 leading-relaxed">{tech.objective}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1">🧬 MÉCANISME PHYSIOLOGIQUE</div>
            <p className="text-xs text-slate-300 leading-relaxed">{tech.mechanism}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1">⚙️ MISE EN ŒUVRE</div>
            <ul className="space-y-1">
              {tech.implementation.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className={`font-bold ${p.color} mt-0.5`}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
            <div className="text-xs font-semibold text-amber-400 mb-1">⚠️ SÉCURITÉ & CONTRE-INDICATIONS</div>
            <p className="text-xs text-amber-300/80 leading-relaxed">{tech.safety}</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded p-2">
            <div className="text-xs font-semibold text-slate-400 mb-1">📈 PROGRESSION SUR 6 SEMAINES</div>
            <p className="text-xs text-slate-300 leading-relaxed">{tech.progression}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Intensification() {
  const [openId, setOpenId] = useState("wave");

  return (
    <div className="max-w-2xl mx-auto p-3">
      <PageHeader part="⚡ FICHE TECHNIQUES D'INTENSIFICATION" subtitle="5 techniques · Mécanismes · Mise en œuvre · Sécurité · Progression" />

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(priorityConfig).map(([key, val]) => (
          <div key={key} className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${val.border} ${val.bg}`}>
            <span className={`font-semibold ${val.color}`}>{val.label}</span>
          </div>
        ))}
      </div>

      {techniques.map((tech) => (
        <TechniqueCard key={tech.id} tech={tech} isOpen={openId === tech.id} onToggle={() => setOpenId(openId === tech.id ? null : tech.id)} />
      ))}

      <div className="mt-2 border border-red-500/20 bg-red-500/5 rounded p-3 text-xs">
        <div className="font-semibold text-red-400 mb-1">🛡️ RÈGLES DE SÉCURITÉ GLOBALES</div>
        <ul className="text-slate-400 space-y-1">
          <li>• Ne jamais appliquer plus de 2 techniques d'intensification par séance</li>
          <li>• Réserver les techniques aux 1–2 dernières séries uniquement</li>
          <li>• Stopper si douleur articulaire (genou, coude G, lombaires)</li>
          <li>• Semaine 3 et 6 : déload optionnel (–30% volume, pas de techniques)</li>
          <li>• Hydratation : min 500 ml/séance, nutrition post-entraînement dans les 45 min</li>
        </ul>
      </div>
    </div>
  );
}
