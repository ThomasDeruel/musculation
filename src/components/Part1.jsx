import { useState } from "react";
import { PageHeader, TabBar, DayPanel, TempoGuide, Legend, TimingBox } from "./Shared";

const programData = {
  day1: {
    label: "Jour 1", focus: "POITRINE & TRICEPS", tag: "Push A", duration: "~60 min",
    exercises: [
      { name: "Développé couché haltères", priority: 3, sets: "4", reps: "4–6", tempo: "3-1-1-0", rest: "3 min", technique: "Wave Loading : 6/5/4/4 reps avec charge croissante", note: "Coude G: prise neutre disponible si douleur" },
      { name: "Développé incliné barre", priority: 3, sets: "4", reps: "5–7", tempo: "3-0-1-0", rest: "2 min 30", technique: null, note: null },
      { name: "Dips lestés", priority: 2, sets: "3", reps: "6–8", tempo: "2-1-1-0", rest: "2 min", technique: "Rest-Pause sur dernière série", note: "Incliner légèrement le buste pour cibler la poitrine" },
      { name: "Écarté poulie haute", priority: 2, sets: "3", reps: "10–12", tempo: "2-1-2-0", rest: "90 sec", technique: null, note: null },
      { name: "Pushdown câble corde", priority: 1, sets: "3", reps: "10–12", tempo: "2-1-2-0", rest: "75 sec", technique: "Drop set sur dernière série (–20%)", note: "Coude G: adapter amplitude si inconfort" },
      { name: "Extension triceps prise neutre câble", priority: 1, sets: "2", reps: "12–15", tempo: "2-0-2-0", rest: "60 sec", technique: null, note: null },
    ]
  },
  day2: {
    label: "Jour 2", focus: "DOS & BICEPS", tag: "Pull A", duration: "~60 min",
    exercises: [
      { name: "Tirage poitrine prise large", priority: 3, sets: "4", reps: "4–6", tempo: "2-1-2-1", rest: "3 min", technique: "Cluster Sets : 2+2+2 avec 15 sec intra-set", note: null },
      { name: "Rowing barre prise supination", priority: 3, sets: "4", reps: "5–7", tempo: "2-1-1-0", rest: "2 min 30", technique: null, note: "Gainage lombaire actif – pas de rotation du bassin" },
      { name: "Tirage nuque prise neutre V-bar", priority: 2, sets: "3", reps: "8–10", tempo: "2-0-2-1", rest: "2 min", technique: null, note: null },
      { name: "Rowing unilatéral haltère", priority: 2, sets: "3", reps: "8–10", tempo: "2-1-1-0", rest: "90 sec", technique: "Myo-reps sur dernière série", note: "Coude G: privilégier prise neutre" },
      { name: "Curl marteau câble", priority: 1, sets: "3", reps: "10–12", tempo: "2-1-2-0", rest: "75 sec", technique: null, note: "Prise neutre : ménage le coude gauche" },
      { name: "Curl incliné haltère", priority: 1, sets: "2", reps: "12–15", tempo: "3-0-2-0", rest: "60 sec", technique: null, note: "Si coude G OK : bilatéral; sinon unilatéral D" },
    ]
  }
};

const justifications = [
  { title: "1. Répartition des groupes musculaires", icon: "🧬", content: "Structure Push/Pull/Legs/Upper/Full sur 5 jours. Le Jour 1 (Push) et Jour 2 (Pull) exploitent la récupération antagoniste : la poitrine récupère pendant que le dos travaille le lendemain. Les lombaires fragilisés imposent d'éviter le soulevé de terre classique — remplacé par le rowing haltère unilatéral et le tirage poulie qui minimisent la compression axiale. Le genou enflammé exclut les squats profonds et mouvements de flexion >90° ; les quadriceps seront ciblés via leg press à amplitude contrôlée." },
  { title: "2. Choix des exercices", icon: "🏋️", content: "Les mouvements composés (tirage poitrine, rowing barre, développé couché) sont placés en début de séance quand le SNC est frais et permettent les charges maximales requises par l'objectif force. Les exercices d'isolation (écarté poulie, curl marteau) arrivent en fin de séance pour cibler les faisceaux sans fatiguer les stabilisateurs. Le curl marteau en prise neutre protège le coude gauche (sollicitation brachioradial > biceps long). Les tempos 3-1-1-0 sur les composés maximisent le temps sous tension excentrique." },
  { title: "3. Intensification progressive", icon: "📈", content: "Wave Loading sur le développé couché (6/5/4/4) induit une potentialisation post-activation : chaque vague légèrement plus lourde recalibre le SNC vers le haut. Les Cluster Sets au tirage (2+2+2 + 15 sec) permettent de maintenir la vitesse de barre sur des intensités >85% 1RM sans accumulation de fatigue excessive. Le Rest-Pause et les Myo-reps sont réservés aux exercices secondaires pour un surcroît de volume sans risquer la technique sur les composés lourds." },
  { title: "4. Justifications Neuromusculaires", icon: "⚡", content: "L'entraînement en force (4–7 reps, 80–90% 1RM) recrute préférentiellement les unités motrices de type II à seuil élevé, responsables des gains de force maximale. Les repos longs (2 min 30–3 min) permettent la resynthèse quasi-complète de la phosphocréatine (~90–95%), condition nécessaire à la répétition d'efforts maximaux. Les tempos avec phase excentrique longue (3 secondes) amplifient les dommages musculaires contrôlés et la signalisation mTOR." },
  { title: "5. Justifications Psychologiques", icon: "🧠", content: "La structure Push/Pull/Legs offre une clarté mentale : l'athlète sait exactement quel groupe musculaire travaille, ce qui facilite l'intention de contraction et la connexion neuromusculaire. Les techniques variées (Wave, Cluster, Rest-Pause, Myo-reps) introduisent une nouveauté stimulante séance après séance, évitant la monotonie sans sacrifier la progression. Les fourchettes de répétitions courtes (4–7) créent un sentiment de performance tangible à chaque série, alimentant la motivation intrinsèque." },
];

export default function Part1() {
  const [mainTab, setMainTab] = useState("programme");
  const [dayTab, setDayTab] = useState("day1");

  return (
    <div className="max-w-2xl mx-auto p-3">
      <PageHeader part="📋 PARTIE 1 — Jours 1 & 2" />
      <TabBar tabs={[["programme", "💪 Programme"], ["justifications", "🧬 Justifications"]]} active={mainTab} onChange={setMainTab} />

      {mainTab === "programme" && (
        <div>
          <TabBar
            tabs={[["day1", "J1 · Push A"], ["day2", "J2 · Pull A"]]}
            active={dayTab}
            onChange={setDayTab}
            colorActive="bg-violet-600/30 border border-violet-500 text-violet-300"
          />
          <Legend />
          <TempoGuide />
          <DayPanel day={programData[dayTab]} />
          <TimingBox
            lines={["Échauffement : 5 min", "6 exercices × ~8 min (séries + repos) : ~48 min", "Transitions / hydratation : 4 min"]}
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
