import { useState } from "react";
import { PageHeader, TabBar, DayPanel, TempoGuide, Legend, TimingBox, ExerciseCard } from "./Shared";

const day5 = {
  label: "Jour 5", focus: "FULL BODY — Force & Rattrapage", tag: "Pull B + Composés", duration: "~60 min",
  exercises: [
    { name: "Soulevé de terre roumain haltères", priority: 3, sets: "5", reps: "4–6", tempo: "3-1-1-0", rest: "3 min", technique: "Wave Loading : 6/5/5/4/4 — charge croissante par vague", note: "Remplace le soulevé de terre classique : dos neutre, pas de flexion lombaire forcée" },
    { name: "Tirage horizontal câble prise large", priority: 3, sets: "4", reps: "5–7", tempo: "2-1-2-1", rest: "2 min 30", technique: "Cluster Sets : 3+2+2 avec 15 sec intra-set", note: "Coude G: prise neutre si douleur — switcher sur V-bar" },
    { name: "Développé couché prise serrée barre", priority: 3, sets: "4", reps: "5–7", tempo: "3-1-1-0", rest: "2 min 30", technique: null, note: "Prise à largeur épaules — sollicite triceps + faisceau sternal" },
    { name: "Leg Press unilatéral (jambe faible en priorité)", priority: 2, sets: "3", reps: "8–10 / jambe", tempo: "3-1-1-0", rest: "2 min", technique: "Rest-Pause sur dernière série", note: "Amplitude ≤80° — genou protégé. Corrige les déséquilibres gauche/droite" },
    { name: "Face pull corde haute", priority: 2, sets: "3", reps: "12–15", tempo: "2-1-2-1", rest: "90 sec", technique: null, note: "Récurrence volontaire : santé coiffe des rotateurs, antagoniste aux développés de la semaine" },
    { name: "Curl biceps câble barre EZ", priority: 1, sets: "3", reps: "10–12", tempo: "2-1-2-0", rest: "75 sec", technique: "Drop set sur dernière série (–20%)", note: "Barre EZ = prise semi-supination, réduit le stress sur le coude gauche vs barre droite" },
    { name: "Gainage planche latérale + rotation", priority: 1, sets: "3", reps: "30 sec / côté", tempo: "—", rest: "60 sec", technique: null, note: "Renforcement lombaire fonctionnel — protège le bas du dos sur le long terme" },
  ]
};

const weekSummary = [
  { day: "Lun", tag: "J1", focus: "Poitrine & Triceps", type: "Push A", color: "text-red-400" },
  { day: "Mar", tag: "J2", focus: "Dos & Biceps", type: "Pull A", color: "text-red-400" },
  { day: "Mer", tag: "J3", focus: "Jambes (adapté)", type: "Legs A", color: "text-red-400" },
  { day: "Jeu", tag: "J4", focus: "Épaules & Trapèzes", type: "Push B", color: "text-red-400" },
  { day: "Ven", tag: "J5", focus: "Full Body / Pull B", type: "Pull B+", color: "text-violet-400" },
  { day: "Sam", tag: "—", focus: "Repos actif", type: "Récupération", color: "text-slate-500" },
  { day: "Dim", tag: "—", focus: "Repos complet", type: "Récupération", color: "text-slate-500" },
];

const justifications = [
  { icon: "🏋️", title: "Jour 5 — Full Body : Logique de clôture hebdomadaire", content: "Le Jour 5 joue un double rôle : consolider les patterns neuromusculaires travaillés en début de semaine ET rattraper les groupes sous-stimulés. Le soulevé de terre roumain aux haltères clôt la semaine sur un mouvement de charnière hanche heavy sans compression lombaire excessive. Le développé prise serrée réactive les triceps avec un angle différent des dips du Jour 1." },
  { icon: "⚖️", title: "Équilibre musculaire global de la semaine", content: "Poitrine : J1 (4 ex) + J5 (1 ex) = volume force optimal. Dos : J2 (4 ex) + J5 (2 ex) = ratio push/pull équilibré 1:1.2 (légère dominance pull — recommandé pour la santé de l'épaule). Jambes : J3 (5 ex) + J5 (1 ex unilatéral) = correction des déséquilibres. Épaules : J4 (5 ex) + Face pull J5 = fréquence 2× sur deltoïde postérieur." },
  { icon: "🔄", title: "Récupération & organisation hebdomadaire", content: "Les 5 jours consécutifs sont viables car aucun grand groupe musculaire n'est sollicité à haute intensité deux jours de suite. Les 48h de repos le week-end permettent une resynthèse complète du glycogène musculaire et une récupération du SNC avant le nouveau cycle. Un repos actif le Samedi (marche, mobilité, étirements doux) est recommandé." },
  { icon: "🧬", title: "Gainage lombaire : priorité préventive", content: "La planche latérale avec rotation est placée en fin de séance intentionnellement : les muscles stabilisateurs du rachis (quadratus lumborum, obliques) sont sollicités après que les grands mouvements composés aient déjà effectué le travail de renforcement global. Sur 6 semaines, ce travail hebdomadaire réduit significativement le risque de récidive des douleurs lombaires." },
];

export default function Part3() {
  const [mainTab, setMainTab] = useState("programme");
  const [showWeek, setShowWeek] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-3">
      <PageHeader part="📋 PARTIE 3 — Jour 5 + Récap semaine" />
      <TabBar tabs={[["programme", "💪 Programme"], ["justifications", "🧬 Justifications"]]} active={mainTab} onChange={setMainTab} />

      {mainTab === "programme" && (
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs font-bold px-2 py-1 rounded text-red-400 bg-red-500/10 border border-red-500/30">{day5.tag}</div>
            <div className="text-slate-300 text-sm font-semibold">{day5.focus}</div>
            <div className="ml-auto text-slate-500 text-xs">⏳ {day5.duration}</div>
          </div>
          <Legend />
          <TempoGuide />
          {day5.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} />)}
          <TimingBox
            lines={["Échauffement : 5 min", "7 exercices × ~7 min : ~49 min", "Transitions / hydratation : 4 min"]}
            total="Total : ~58 min ✓"
          />
          <button
            onClick={() => setShowWeek(!showWeek)}
            className="w-full mt-4 py-2 text-xs rounded border border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all font-semibold"
          >
            {showWeek ? "▲ Masquer" : "▼ Voir"} le récapitulatif hebdomadaire complet
          </button>
          {showWeek && (
            <div className="mt-3 border border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300 border-b border-slate-700">📅 SEMAINE TYPE</div>
              {weekSummary.map((d, i) => (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 text-xs border-b border-slate-800 ${i % 2 === 0 ? "bg-slate-800/30" : "bg-slate-900/30"}`}>
                  <span className="text-slate-500 w-6">{d.day}</span>
                  <span className={`font-bold w-6 ${d.color}`}>{d.tag}</span>
                  <span className={`flex-1 ${d.color}`}>{d.focus}</span>
                  <span className="text-slate-600 text-xs">{d.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mainTab === "justifications" && (
        <div className="space-y-3">
          {justifications.map((j, i) => (
            <div key={i} className="border border-slate-700 rounded-lg p-3 bg-slate-800/40">
              <div className="flex items-center gap-2 mb-2">
                <span>{j.icon}</span>
                <h3 className="text-sm font-bold text-red-400">{j.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{j.content}</p>
            </div>
          ))}
          <div className="border border-green-500/30 bg-green-500/10 rounded p-2 text-xs text-green-300">
            <span className="font-semibold">✅ Programme complet — 5 jours validés</span><br />
            Tous les groupes musculaires couverts · Adaptations blessures intégrées · Durée ~57–58 min/séance
          </div>
        </div>
      )}
    </div>
  );
}
