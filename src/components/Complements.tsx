import { useState } from "react";
import { PageHeader } from "./Shared";

const supplements = [
  {
    id: "creatine",
    name: "Créatine Monohydrate",
    icon: "⚡",
    priority: "essential",
    priorityLabel: "Indispensable",
    price: "€",
    goal: "Force & Puissance",
    description: "Le complément le mieux documenté scientifiquement. Augmente les réserves de phosphocréatine musculaire, permettant plus de reps sur les séries lourdes et une récupération inter-séries accélérée.",
    dosage: "3–5 g / jour",
    timing: "N'importe quand — la constance prime sur le timing. Post-entraînement légèrement supérieur.",
    duration: "En continu — pas de phase de charge nécessaire",
    inflammation: "neutre",
    inflammationNote: "Aucun effet négatif sur les inflammations articulaires. Peut même avoir un léger effet protecteur sur les tendons.",
    avoid: false,
    tags: ["Force", "Récupération", "Prouvé scientifiquement"]
  },
  {
    id: "proteines",
    name: "Protéines Whey",
    icon: "🥛",
    priority: "essential",
    priorityLabel: "Indispensable",
    price: "€€",
    goal: "Récupération musculaire",
    description: "Complète l'apport protéique quotidien (cible : 1.6–2.2 g/kg de poids corporel). Accélère la synthèse protéique musculaire post-entraînement. Privilégier la whey isolate si sensibilité digestive.",
    dosage: "20–40 g / prise selon déficit alimentaire du jour",
    timing: "Dans les 2h post-entraînement. Peut aussi servir de collation protéinée.",
    duration: "Selon les besoins alimentaires quotidiens",
    inflammation: "neutre",
    inflammationNote: "Neutre sur les inflammations. La whey isolate est préférable en cas de sensibilités digestives.",
    avoid: false,
    tags: ["Récupération", "Muscles", "Pratique"]
  },
  {
    id: "omega3",
    name: "Oméga-3 (EPA/DHA)",
    icon: "🐟",
    priority: "essential",
    priorityLabel: "Indispensable",
    price: "€€",
    goal: "Anti-inflammatoire & Articulations",
    description: "Priorité absolue avec vos inflammations (genou, coude, lombaires). L'EPA et le DHA inhibent les voies pro-inflammatoires (COX-2, NF-κB) et favorisent la résolution de l'inflammation chronique. Également bénéfique pour la sensibilité à l'insuline et la récupération neuromusculaire.",
    dosage: "2–4 g d'EPA+DHA / jour (vérifier la teneur sur l'étiquette, pas le total huile de poisson)",
    timing: "Avec les repas contenant des graisses — meilleure absorption",
    duration: "En continu — effets maximaux après 8–12 semaines",
    inflammation: "positive",
    inflammationNote: "⭐ Recommandation prioritaire pour votre profil. Effet anti-inflammatoire documenté sur les tendons, cartilages et disques intervertébraux.",
    avoid: false,
    tags: ["Anti-inflammatoire", "Articulations", "Genou", "Coude", "Lombaires"]
  },
  {
    id: "vitd",
    name: "Vitamine D3 + K2",
    icon: "☀️",
    priority: "essential",
    priorityLabel: "Indispensable",
    price: "€",
    goal: "Force & Santé osseuse",
    description: "La vitamine D3 est un précurseur hormonal qui régule la synthèse protéique musculaire, la force de contraction et la santé osseuse/articulaire. La K2 dirige le calcium vers les os (et non les artères). Carence très fréquente en France, surtout en automne/hiver.",
    dosage: "2000–4000 UI D3 / jour + 100–200 mcg K2 MK-7",
    timing: "Avec un repas contenant des graisses (liposoluble)",
    duration: "En continu — dosage à ajuster selon bilan sanguin (idéal : 25-OH-D entre 60–80 ng/mL)",
    inflammation: "positive",
    inflammationNote: "La vitamine D module la réponse inflammatoire et contribue à la santé du cartilage et des ligaments. Particulièrement pertinent pour genou et lombaires.",
    avoid: false,
    tags: ["Force", "Os", "Articulations", "Immunité"]
  },
  {
    id: "magnesium",
    name: "Magnésium Bisglycinate",
    icon: "🧲",
    priority: "high",
    priorityLabel: "Recommandé",
    price: "€",
    goal: "Récupération & Système nerveux",
    description: "Le magnésium est co-facteur de plus de 300 réactions enzymatiques. En entraînement intense, les pertes sudorales augmentent les besoins. Le bisglycinate (ou malate) est la forme la mieux absorbée et la plus douce pour l'intestin — éviter l'oxyde de magnésium (mal absorbé).",
    dosage: "300–400 mg de magnésium élémentaire / jour",
    timing: "Le soir au dîner — favorise la qualité du sommeil et la récupération nocturne du SNC",
    duration: "En continu",
    inflammation: "positive",
    inflammationNote: "Le magnésium réduit les marqueurs inflammatoires (CRP, IL-6) et aide à la gestion du stress oxydatif lié à l'entraînement.",
    avoid: false,
    tags: ["Récupération", "Sommeil", "SNC", "Crampes"]
  },
  {
    id: "collagene",
    name: "Collagène Hydrolysé + Vitamine C",
    icon: "🦴",
    priority: "high",
    priorityLabel: "Recommandé",
    price: "€€",
    goal: "Tendons & Cartilages",
    description: "Le collagène de type I et II apporte les acides aminés précurseurs (glycine, proline, hydroxyproline) nécessaires à la synthèse du collagène tendineux et cartilagineux. La vitamine C est indispensable à cette synthèse (cofacteur de la prolyl-hydroxylase). Particulièrement pertinent pour genou inflammé et coude.",
    dosage: "10–15 g de collagène hydrolysé + 200 mg de vitamine C",
    timing: "30–60 min AVANT l'entraînement — la synthèse de collagène est maximale dans les heures suivant l'apport, profiter du flux sanguin vers les tissus pendant l'effort",
    duration: "Minimum 12 semaines pour des effets sur les tendons",
    inflammation: "positive",
    inflammationNote: "Soutien direct aux structures fragilisées : cartilage du genou, tendons du coude, disques intervertébraux.",
    avoid: false,
    tags: ["Tendons", "Cartilage", "Genou", "Coude", "Lombaires"]
  },
  {
    id: "cafeine",
    name: "Caféine",
    icon: "☕",
    priority: "medium",
    priorityLabel: "Optionnel",
    price: "€",
    goal: "Performance & Focus",
    description: "Ergogène le plus utilisé et documenté. Augmente la force maximale, réduit la perception de l'effort et améliore la concentration. Tolérance individuelle variable — cycle on/off recommandé pour maintenir la sensibilité.",
    dosage: "3–6 mg/kg de poids corporel (ex: 75 kg → 225–450 mg)",
    timing: "45–60 min avant l'entraînement. Éviter après 14h si entraînement le soir (impact sommeil)",
    duration: "Non quotidien — réserver aux séances lourdes (J1, J4, J5). Pause 1–2 semaines toutes les 6–8 semaines.",
    inflammation: "neutre",
    inflammationNote: "Pas d'effet direct sur les inflammations. À dose élevée, peut légèrement augmenter le cortisol — modérer si stress chronique.",
    avoid: false,
    tags: ["Performance", "Focus", "Force", "Ergogène"]
  },
  {
    id: "curcumine",
    name: "Curcumine + Pipérine",
    icon: "🟡",
    priority: "medium",
    priorityLabel: "Optionnel",
    price: "€€",
    goal: "Anti-inflammatoire naturel",
    description: "La curcumine inhibe NF-κB et COX-2 (mêmes cibles que les anti-inflammatoires classiques) sans les effets secondaires gastro-intestinaux. La pipérine augmente la biodisponibilité de 2000%. Bénéfique pour les inflammations chroniques articulaires.",
    dosage: "500–1000 mg de curcumine + 5–10 mg de pipérine / jour",
    timing: "Avec un repas contenant des graisses",
    duration: "Cures de 8–12 semaines, pause 4 semaines",
    inflammation: "positive",
    inflammationNote: "Particulièrement pertinent pour genou et coude. Peut permettre de réduire la dépendance aux AINS si utilisés.",
    avoid: false,
    tags: ["Anti-inflammatoire", "Genou", "Coude", "Naturel"]
  },
  {
    id: "nsaids",
    name: "AINS (Ibuprofène, Diclofénac…)",
    icon: "⚠️",
    priority: "avoid",
    priorityLabel: "À limiter",
    price: "€",
    goal: "Anti-douleur",
    description: "Les AINS inhibent les prostaglandines nécessaires à la signalisation anabolique musculaire. Pris systématiquement, ils réduisent l'adaptation musculaire et tendineux à l'entraînement. À réserver aux crises aiguës uniquement, pas en prévention.",
    dosage: "Usage ponctuel uniquement",
    timing: "Jamais en pré-entraînement systématique",
    duration: "Maximum 5–7 jours consécutifs",
    inflammation: "negative",
    inflammationNote: "Paradoxe : masquent l'inflammation sans la résoudre, et bloquent partiellement les adaptations musculaires positives à l'entraînement.",
    avoid: true,
    tags: ["À éviter en routine", "Contre-productif", "Usage ponctuel seulement"]
  }
];

const priorityConfig = {
  essential: { label: "Indispensable", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-400" },
  high: { label: "Recommandé", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", dot: "bg-violet-400" },
  medium: { label: "Optionnel", color: "text-slate-400", bg: "bg-slate-700/30", border: "border-slate-600", dot: "bg-slate-400" },
  avoid: { label: "À limiter", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-400" },
};

const inflammationConfig = {
  positive: { icon: "✅", label: "Bénéfique", color: "text-green-400" },
  neutre: { icon: "➖", label: "Neutre", color: "text-slate-400" },
  negative: { icon: "⚠️", label: "À limiter", color: "text-amber-400" },
};

const budgetStacks = [
  {
    label: "Stack Essentiel",
    price: "~30–50 €/mois",
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    items: ["Créatine Monohydrate", "Vitamine D3 + K2", "Magnésium Bisglycinate"],
    note: "Base solide pour la force et la récupération. Priorité absolue."
  },
  {
    label: "Stack Intermédiaire",
    price: "~80–110 €/mois",
    color: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    items: ["Créatine Monohydrate", "Whey Protéine", "Oméga-3 EPA/DHA", "Vitamine D3 + K2", "Magnésium Bisglycinate"],
    note: "Stack optimal pour votre profil force + blessures. Meilleur rapport qualité/résultats."
  },
  {
    label: "Stack Complet",
    price: "~130–170 €/mois",
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    items: ["Tous les essentiels", "Collagène + Vitamine C", "Curcumine + Pipérine", "Caféine (séances clés)"],
    note: "Optimisation maximale. Le collagène et la curcumine ciblent directement genou, coude et lombaires."
  }
];

function SupplementCard({ supp, isOpen, onToggle }) {
  const p = priorityConfig[supp.priority];
  const inf = inflammationConfig[supp.inflammation];

  return (
    <div className={`border rounded-lg mb-3 overflow-hidden ${p.border} ${p.bg}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-2 p-3 text-left hover:bg-white/5 transition-all">
        <span className="text-xl">{supp.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold text-sm ${p.color}`}>{supp.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded border ${p.border} ${p.color}`}>{supp.priorityLabel}</span>
            <span className="text-slate-600 text-xs">{supp.price}</span>
          </div>
          <div className="text-slate-500 text-xs mt-0.5">{supp.goal}</div>
        </div>
        <span className={`text-slate-500 text-xs flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="px-3 pb-3 space-y-3 border-t border-slate-700/50 pt-3">
          <p className="text-xs text-slate-300 leading-relaxed">{supp.description}</p>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-slate-800/60 border border-slate-700 rounded p-2">
              <div className="text-xs font-semibold text-slate-400 mb-0.5">💊 Dosage</div>
              <p className="text-xs text-slate-300">{supp.dosage}</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded p-2">
              <div className="text-xs font-semibold text-slate-400 mb-0.5">⏰ Timing</div>
              <p className="text-xs text-slate-300">{supp.timing}</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded p-2">
              <div className="text-xs font-semibold text-slate-400 mb-0.5">📅 Durée</div>
              <p className="text-xs text-slate-300">{supp.duration}</p>
            </div>
          </div>

          <div className={`rounded p-2 border ${
            supp.inflammation === "positive" ? "bg-green-500/10 border-green-500/30" :
            supp.inflammation === "negative" ? "bg-amber-500/10 border-amber-500/30" :
            "bg-slate-800/40 border-slate-700"
          }`}>
            <div className={`text-xs font-semibold mb-0.5 ${inf.color}`}>
              {inf.icon} Impact inflammations — {inf.label}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{supp.inflammationNote}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {supp.tags.map((tag, i) => (
              <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400 border border-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Complements() {
  const [activeTab, setActiveTab] = useState("liste");
  const [openId, setOpenId] = useState("omega3");
  const [filterPriority, setFilterPriority] = useState("all");

  const filtered = filterPriority === "all"
    ? supplements
    : supplements.filter(s => s.priority === filterPriority);

  return (
    <div className="max-w-2xl mx-auto p-3">
      <PageHeader
        part="💊 COMPLÉMENTS ALIMENTAIRES"
        subtitle="Recommandations personnalisées · Force · Inflammations · Dosages · Budget"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {[["liste", "📋 Liste"], ["budget", "💰 Budget & Stacks"], ["timing", "⏰ Planning journalier"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-1.5 text-xs rounded font-semibold transition-all ${
              activeTab === key ? "bg-red-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* LISTE TAB */}
      {activeTab === "liste" && (
        <div>
          {/* Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 mb-3 text-xs text-amber-300">
            ⚕️ Ces recommandations sont informatives. Consultez un médecin avant de débuter une supplémentation, particulièrement avec des inflammations chroniques.
          </div>

          {/* Filters */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {[["all", "Tous"], ["essential", "Indispensables"], ["high", "Recommandés"], ["medium", "Optionnels"], ["avoid", "À limiter"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterPriority(key)}
                className={`text-xs px-2 py-1 rounded border transition-all ${
                  filterPriority === key
                    ? "bg-red-500/20 border-red-500/40 text-red-400"
                    : "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {filtered.map((supp) => (
            <SupplementCard
              key={supp.id}
              supp={supp}
              isOpen={openId === supp.id}
              onToggle={() => setOpenId(openId === supp.id ? null : supp.id)}
            />
          ))}
        </div>
      )}

      {/* BUDGET TAB */}
      {activeTab === "budget" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Trois niveaux d'investissement selon vos priorités. Le stack intermédiaire est le meilleur rapport qualité/résultats pour votre profil.
          </p>
          {budgetStacks.map((stack, i) => (
            <div key={i} className={`border rounded-lg p-3 ${stack.border} ${stack.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-sm ${stack.color}`}>{stack.label}</span>
                <span className={`text-xs font-semibold ${stack.color}`}>{stack.price}</span>
              </div>
              <ul className="space-y-1 mb-2">
                {stack.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${stack.color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 italic">{stack.note}</p>
            </div>
          ))}

          <div className="border border-slate-700 bg-slate-800/40 rounded p-3 text-xs">
            <div className="font-semibold text-slate-300 mb-2">💡 Conseils d'achat</div>
            <ul className="space-y-1 text-slate-400">
              <li>• Créatine : monohydrate pure (pas de formules "avancées" inutiles)</li>
              <li>• Whey : isolate si digestion sensible, concentrée sinon</li>
              <li>• Oméga-3 : vérifier la teneur EPA+DHA (pas le total huile de poisson)</li>
              <li>• Magnésium : bisglycinate ou malate uniquement — éviter l'oxyde</li>
              <li>• Collagène : hydrolysé de type I+II, avec vitamine C incluse</li>
            </ul>
          </div>
        </div>
      )}

      {/* TIMING TAB */}
      {activeTab === "timing" && (
        <div>
          <p className="text-xs text-slate-400 mb-3">Planning basé sur le stack intermédiaire + anti-inflammatoires. Adapter selon vos horaires d'entraînement.</p>

          {[
            {
              moment: "🌅 Matin (réveil)",
              color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10",
              items: [
                { name: "Vitamine D3 + K2", detail: "Avec le petit-déjeuner (graisses)" },
                { name: "Oméga-3", detail: "2g EPA+DHA avec le repas" },
                { name: "Curcumine + Pipérine", detail: "Optionnel — avec graisses" },
              ]
            },
            {
              moment: "⚡ Pré-entraînement (–60 min)",
              color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10",
              items: [
                { name: "Collagène hydrolysé + Vit C", detail: "15g + 200mg — 30 à 60 min avant" },
                { name: "Caféine", detail: "Optionnel — séances lourdes uniquement" },
              ]
            },
            {
              moment: "💪 Post-entraînement (–45 min)",
              color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10",
              items: [
                { name: "Whey Protéine", detail: "20–40g selon apports alimentaires" },
                { name: "Créatine", detail: "3–5g — timing flexible, post-entraînement optimal" },
              ]
            },
            {
              moment: "🌙 Soir (dîner)",
              color: "text-slate-400", border: "border-slate-600", bg: "bg-slate-800/40",
              items: [
                { name: "Magnésium Bisglycinate", detail: "300–400mg — favorise récupération SNC" },
                { name: "Oméga-3 (2e dose)", detail: "Si objectif 4g/jour — avec le repas" },
              ]
            }
          ].map((block, i) => (
            <div key={i} className={`border rounded-lg p-3 mb-3 ${block.border} ${block.bg}`}>
              <div className={`font-bold text-sm mb-2 ${block.color}`}>{block.moment}</div>
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${block.color.replace("text-", "bg-")}`} />
                    <div>
                      <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                      <span className="text-xs text-slate-500 ml-1">— {item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="border border-green-500/30 bg-green-500/10 rounded p-2 text-xs text-green-300">
            <span className="font-semibold">✅ Priorité absolue pour vos blessures :</span><br />
            Oméga-3 + Collagène + Vitamine D3 — ces 3 compléments ciblent directement genou, coude et lombaires.
          </div>
        </div>
      )}
    </div>
  );
}