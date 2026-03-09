import { useState } from "react";
import { PageHeader, TabBar, DayPanel, TempoGuide, Legend, TimingBox } from "./Shared";

const programData = {
  day3: {
    label: "Jour 3", focus: "JAMBES (adapté genou)", tag: "Legs A", duration: "~60 min",
    exercises: [
      { name: "Leg Press 45° amplitude contrôlée", priority: 3, sets: "5", reps: "4–6", tempo: "3-1-1-0", rest: "3 min", technique: "Wave Loading : 6/5/5/4/4 reps, charge croissante par vague", note: "Flexion max 80° — protège le genou inflammé. Pieds hauts pour cibler ischios/fessiers" },
      { name: "Fentes marchées haltères", priority: 3, sets: "4", reps: "8–10 / jambe", tempo: "2-1-1-0", rest: "2 min 30", technique: null, note: "Pas trop long — genou avant ne dépasse pas l'orteil. Stopper si douleur au genou" },
      { name: "Leg curl couché (ischio-jambiers)", priority: 2, sets: "4", reps: "6–8", tempo: "2-1-3-0", rest: "2 min", technique: "Rest-Pause sur dernière série : 6 reps + 15 sec + max", note: "Phase excentrique lente (3 sec) — recrutement maximal sans compression du genou" },
      { name: "Leg extension (quadriceps isolé)", priority: 2, sets: "3", reps: "10–12", tempo: "2-1-2-1", rest: "90 sec", technique: "Drop set sur dernière série (–20%)", note: "⚠️ Amplitude partielle si gêne au genou : 30°→90° uniquement" },
      { name: "Hip Thrust barre (fessiers/ischios)", priority: 2, sets: "3", reps: "8–10", tempo: "2-1-2-1", rest: "90 sec", technique: null, note: "Aucune compression du genou — exercice clé pour compenser le squat" },
      { name: "Mollets debout machine", priority: 1, sets: "3", reps: "10–15", tempo: "2-1-3-0", rest: "60 sec", technique: null, note: null },
    ]
  },
  day4: {
    label: "Jour 4", focus: "ÉPAULES & TRAPÈZES", tag: "Push B", duration: "~60 min",
    exercises: [
      { name: "Développé militaire haltères assis", priority: 3, sets: "5", reps: "4–6", tempo: "3-1-1-0", rest: "3 min", technique: "Wave Loading : 6/5/5/4/4 — prise neutre disponible si coude G douloureux", note: "Haltères préférés à la barre : liberté articulaire + protection coude gauche" },
      { name: "Élévations latérales câble unilatéral", priority: 2, sets: "4", reps: "10–12", tempo: "2-1-2-1", rest: "90 sec", technique: "Myo-reps sur dernière série (activation set 12 + 3×5 mini-sets 30 sec)", note: "Câble = tension constante sur le deltoïde médial vs haltère" },
      { name: "Face pull corde (deltoïde post. & coiffe)", priority: 2, sets: "4", reps: "12–15", tempo: "2-1-2-1", rest: "90 sec", technique: null, note: "Exercice clé : rééquilibre deltoïde ant/post, santé de la coiffe des rotateurs" },
      { name: "Shrugs haltères (trapèzes)", priority: 2, sets: "3", reps: "8–10", tempo: "1-2-1-0", rest: "2 min", technique: "Cluster Sets : 3+3+2 avec 15 sec intra-set", note: "Pause isométrique 2 sec en haut — recrutement maximal des trapèzes supérieurs" },
      { name: "Élévations frontales câble (deltoïde ant.)", priority: 1, sets: "3", reps: "10–12", tempo: "2-0-2-1", rest: "75 sec", technique: null, note: "Coude G: léger fléchi, amplitude réduite si besoin" },
      { name: "Oiseau poulie basse (deltoïde post.)", priority: 1, sets: "3", reps: "12–15", tempo: "2-1-2-0", rest: "60 sec", technique: "Super-série avec face pull si le temps est serré", note: null },
    ]
  }
};

const justifications = [
  { title: "Jour 3 — Legs : Adaptation genou & lombaires", icon: "🦵", content: "Le squat classique est exclu en raison de l'inflammation du genou : la flexion complète génère une pression fémoro-patellaire jusqu'à 7× le poids du corps. Le Leg Press 45° à amplitude contrôlée (≤80°) permet une charge axiale significative sans ce pic de contrainte. Les fentes remplacent le squat comme mouvement fonctionnel unilatéral. Le Hip Thrust est stratégiquement inclus : aucune compression du genou, fort recrutement fessier/ischios, et allègement de la charge lombaire car le dos reste horizontal." },
  { title: "Jour 4 — Épaules : Équilibre deltoïdien & coude", icon: "🏔️", content: "Les haltères remplacent la barre au développé militaire : ils autorisent une légère rotation externe naturelle et protègent le coude gauche en permettant une prise semi-neutre. Le Face Pull est un exercice prioritaire (⭐⭐) malgré son image d'isolation : il renforce les rotateurs externes et le deltoïde postérieur, contrebalançant la dominance du deltoïde antérieur créée par les développés. Les shrugs en Cluster Sets exploitent la courbe force-longueur des trapèzes en position raccourcie." },
  { title: "Cohérence J3–J4 dans la semaine", icon: "📅", content: "Le Jour 3 (Jambes) après deux jours Upper Body permet une récupération complète des membres supérieurs avant le Jour 4 (Épaules). Les épaules n'ont pas été sollicitées en tant que moteur principal les Jours 1 et 2 (seulement comme stabilisateurs), ce qui garantit 48h de récupération suffisantes pour le développé militaire lourd. Le Jour 5 (Full Body / Rattrapage) sera conçu pour équilibrer la charge globale de la semaine." },
];

export default function Part2() {
  const [mainTab, setMainTab] = useState("programme");
  const [dayTab, setDayTab] = useState("day3");

  return (
    <div className="max-w-2xl mx-auto p-3">
      <PageHeader part="📋 PARTIE 2 — Jours 3 & 4" />
      <TabBar tabs={[["programme", "💪 Programme"], ["justifications", "🧬 Justifications"]]} active={mainTab} onChange={setMainTab} />

      {mainTab === "programme" && (
        <div>
          <TabBar
            tabs={[["day3", "J3 · Legs A"], ["day4", "J4 · Push B"]]}
            active={dayTab}
            onChange={setDayTab}
            colorActive="bg-violet-600/30 border border-violet-500 text-violet-300"
          />
          <Legend />
          <TempoGuide />
          <DayPanel day={programData[dayTab]} />
          <TimingBox
            lines={["Échauffement spécifique : 5 min", "6 exercices × ~8 min (séries + repos) : ~48 min", "Transitions / hydratation : 4 min"]}
            total="Total : ~57 min ✓"
          />
        </div>
      )}

      {mainTab === "justifications" && (
        <div className="space-y-3">
          {justifications.map((j, i) => (
            <div key={i} className="border border-slate-700 rounded-lg p-3 bg-slate-800/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{j.icon}</span>
                <h3 className="text-sm font-bold text-red-400">{j.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{j.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
