import { useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Download,
  FileBarChart,
  FileCheck2,
  FileText,
  Filter,
  Gauge,
  GitCompareArrows,
  HelpCircle,
  History,
  Inbox,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Trash2,
  Upload,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type View =
  | "dashboard"
  | "dossiers"
  | "dossier"
  | "portfolio"
  | "client"
  | "collecte"
  | "alertes"
  | "comparaison"
  | "rapports"
  | "configuration";
type Tone = "neutral" | "success" | "warning" | "danger" | "info";
type ClientTab =
  "overview" | "performance" | "periods" | "financing" | "covenants" | "documents" | "history";
type ConfigSection =
  | "counterparties"
  | "dictionary"
  | "templates"
  | "metrics"
  | "questionnaires"
  | "methodologies"
  | "products"
  | "covenants"
  | "alerts";

const dossiers = [
  {
    id: "DD-2026-084",
    name: "Atlas Microfinance",
    type: "Institution de microfinance",
    amount: "18,5 M MAD",
    stage: "Analyse",
    risk: "B+",
    progress: 72,
    update: "Aujourd’hui, 09:42",
    owner: "Caciopee",
    tone: "warning" as Tone,
  },
  {
    id: "DD-2026-081",
    name: "Nova Industrie",
    type: "TPME",
    amount: "7,2 M MAD",
    stage: "Avis",
    risk: "A-",
    progress: 88,
    update: "Hier, 16:20",
    owner: "N. Berrada",
    tone: "success" as Tone,
  },
  {
    id: "DD-2026-079",
    name: "Al Omrane Services",
    type: "PME",
    amount: "12,0 M MAD",
    stage: "Questionnaire",
    risk: "—",
    progress: 46,
    update: "17 sept. 2026",
    owner: "Y. Idrissi",
    tone: "info" as Tone,
  },
  {
    id: "DD-2026-073",
    name: "Tamwil Coopérative",
    type: "Coopérative financière",
    amount: "5,8 M MAD",
    stage: "Décision",
    risk: "B",
    progress: 96,
    update: "16 sept. 2026",
    owner: "L. Alaoui",
    tone: "danger" as Tone,
  },
  {
    id: "DD-2026-069",
    name: "Sahara Agro",
    type: "TPME",
    amount: "9,4 M MAD",
    stage: "Collecte",
    risk: "—",
    progress: 31,
    update: "15 sept. 2026",
    owner: "M. Tazi",
    tone: "neutral" as Tone,
  },
];

const alerts = [
  {
    client: "Atlas Microfinance",
    label: "Ratio PAR30 au-dessus du seuil",
    metric: "5,8 % > 5,0 %",
    severity: "Critique",
    date: "18 sept. 2026",
    tone: "danger" as Tone,
  },
  {
    client: "Sahara Agro",
    label: "Données trimestrielles manquantes",
    metric: "Retard de 12 jours",
    severity: "Élevée",
    date: "17 sept. 2026",
    tone: "warning" as Tone,
  },
  {
    client: "Tamwil Coopérative",
    label: "Baisse de la marge opérationnelle",
    metric: "−2,4 pts",
    severity: "Élevée",
    date: "16 sept. 2026",
    tone: "warning" as Tone,
  },
  {
    client: "Nova Industrie",
    label: "Garantie à renouveler",
    metric: "Échéance dans 21 j",
    severity: "Moyenne",
    date: "15 sept. 2026",
    tone: "info" as Tone,
  },
];

const nav: { group?: string; items: { id: View; label: string; icon: LucideIcon }[] }[] = [
  { items: [{ id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard }] },
  { group: "DUE DILIGENCE", items: [{ id: "dossiers", label: "Dossiers", icon: ClipboardCheck }] },
  {
    group: "SUIVI",
    items: [
      { id: "portfolio", label: "Suivi du portefeuille", icon: Activity },
      { id: "collecte", label: "Collecte des données", icon: Inbox },
      { id: "alertes", label: "Alertes et covenants", icon: ShieldAlert },
    ],
  },
  {
    group: "REPORTING",
    items: [
      { id: "rapports", label: "Rapports", icon: FileBarChart },
      { id: "comparaison", label: "Benchmarking", icon: BarChart3 },
    ],
  },
  {
    group: "ADMINISTRATION",
    items: [{ id: "configuration", label: "Configuration", icon: Settings2 }],
  },
];

function Status({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold",
        tone === "success" && "bg-success/10 text-success",
        tone === "warning" && "bg-warning/15 text-warning-foreground",
        tone === "danger" && "bg-danger-soft text-destructive",
        tone === "info" && "bg-info-soft text-primary",
        tone === "neutral" && "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card shadow-[0_1px_2px_oklch(0.25_0.02_240/0.04)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function PanelTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase text-primary">{eyebrow}</p>}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  icon: Icon,
  tone = "neutral",
  onClick,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: Tone;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group min-h-32 w-full rounded-lg border border-border bg-card p-4 text-left shadow-[0_1px_2px_oklch(0.25_0.02_240/0.04)] transition hover:border-primary/40 hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-md",
            tone === "danger"
              ? "bg-danger-soft text-destructive"
              : tone === "warning"
                ? "bg-warning/15 text-warning-foreground"
                : tone === "success"
                  ? "bg-success/10 text-success"
                  : "bg-info-soft text-primary",
          )}
        >
          <Icon className="size-4" />
        </span>
        <ChevronRight className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
      </div>
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </button>
  );
}

function Dashboard({ go }: { go: (v: View) => void }) {
  return (
    <>
      <PageHeader
        title="Bonjour, Mr. Amine"
        description="Voici les priorités de votre équipe pour le vendredi 18 septembre."
        action={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-4" /> Période active : T2 2026
          </div>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Dossiers à traiter"
          value="15"
          detail="3 ajoutés cette semaine"
          icon={ClipboardCheck}
          tone="info"
          onClick={() => go("dossiers")}
        />
        <Metric
          label="Soumissions attendues"
          value="9"
          detail="dont 4 en retard"
          icon={Clock3}
          tone="warning"
          onClick={() => go("collecte")}
        />
        <Metric
          label="Alertes actives"
          value="12"
          detail="2 critiques à examiner"
          icon={AlertTriangle}
          tone="danger"
          onClick={() => go("alertes")}
        />
        <Metric
          label="Clients sous suivi"
          value="124"
          detail="Exposition : 684,2 M MAD"
          icon={Building2}
          tone="success"
          onClick={() => go("portfolio")}
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <Panel>
          <PanelTitle
            title="File de travail"
            subtitle="Dossiers nécessitant votre intervention"
            action={
              <Button variant="ghost" size="sm" onClick={() => go("dossiers")}>
                Tout afficher <ArrowRight />
              </Button>
            }
          />
          <div className="divide-y divide-border">
            {[
              ["6", "Dossiers à compléter", "Informations ou pièces manquantes", "warning"],
              ["4", "Prêts pour l’analyse", "Données validées et questionnaire terminé", "info"],
              ["3", "En attente d’avis", "Relance requise auprès des contributeurs", "neutral"],
              ["2", "En attente de décision", "Synthèse et avis disponibles", "success"],
            ].map(([n, l, d, t]) => (
              <button
                key={l}
                onClick={() => go("dossiers")}
                className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-muted/50"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-bold text-secondary-foreground">
                  {n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{l}</span>
                  <span className="block truncate text-xs text-muted-foreground">{d}</span>
                </span>
                <Status tone={t as Tone}>À traiter</Status>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle
            title="Situation du portefeuille"
            subtitle="Évolution depuis le trimestre précédent"
          />
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-card p-5">
              <p className="text-xs text-muted-foreground">Exposition totale</p>
              <p className="mt-2 text-xl font-bold">684,2 M</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-success">
                <ArrowUpRight className="size-3" /> +4,2 %
              </p>
            </div>
            <div className="bg-card p-5">
              <p className="text-xs text-muted-foreground">Note moyenne</p>
              <p className="mt-2 text-xl font-bold">B+</p>
              <p className="mt-1 text-xs text-muted-foreground">Stable</p>
            </div>
            <div className="bg-card p-5">
              <p className="text-xs text-muted-foreground">Indicateurs en baisse</p>
              <p className="mt-2 text-xl font-bold">8</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <ArrowDownRight className="size-3" /> +2 clients
              </p>
            </div>
            <div className="bg-card p-5">
              <p className="text-xs text-muted-foreground">Données à jour</p>
              <p className="mt-2 text-xl font-bold">91 %</p>
              <Progress value={91} className="mt-2" />
            </div>
          </div>
        </Panel>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <Panel>
          <PanelTitle
            title="Alertes prioritaires"
            action={
              <Button variant="ghost" size="sm" onClick={() => go("alertes")}>
                Centre d’alertes <ArrowRight />
              </Button>
            }
          />
          <div className="divide-y divide-border">
            {alerts.slice(0, 3).map((a) => (
              <button
                onClick={() => go("alertes")}
                key={a.label}
                className="flex w-full items-center gap-4 px-5 py-3.5 text-left hover:bg-muted/50"
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    a.tone === "danger" ? "bg-destructive" : "bg-warning",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{a.client}</span>
                  <span className="block truncate text-xs text-muted-foreground">{a.label}</span>
                </span>
                <span className="text-xs font-semibold">{a.metric}</span>
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle title="Activité récente" />
          <div className="space-y-4 p-5">
            {[
              ["Données financières importées", "Nova Industrie · il y a 34 min"],
              ["Avis risque soumis", "Atlas Microfinance · il y a 2 h"],
              ["Décision enregistrée", "Kenz Textile · hier à 17:42"],
            ].map(([a, b], i) => (
              <div key={a} className="flex gap-3">
                <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-secondary text-primary">
                  {i === 0 ? <Upload className="size-3.5" /> : <Check className="size-3.5" />}
                </span>
                <div>
                  <p className="text-sm font-medium">{a}</p>
                  <p className="text-xs text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function Dossiers({ open }: { open: () => void }) {
  return (
    <>
      <PageHeader
        eyebrow="Due diligence"
        title="Dossiers"
        description="Pilotez les analyses en cours, de la collecte jusqu’à la décision."
        action={
          <Button onClick={open}>
            <Plus /> Nouveau dossier
          </Button>
        }
      />
      <Panel>
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Rechercher un dossier ou une contrepartie…" />
          </div>
          <Button variant="outline">
            <Filter /> Statut <ChevronDown />
          </Button>
          <Button variant="outline">
            <SlidersHorizontal /> Plus de filtres
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-left">
            <thead>
              <tr className="border-b border-border bg-muted/45 text-[11px] font-bold uppercase text-muted-foreground">
                {[
                  "Dossier",
                  "Contrepartie",
                  "Demande",
                  "Étape actuelle",
                  "Risque",
                  "Progression",
                  "Dernière mise à jour",
                  "Responsable",
                  "",
                ].map((h) => (
                  <th key={h} className="px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dossiers.map((d) => (
                <tr key={d.id} onClick={open} className="cursor-pointer text-sm hover:bg-muted/40">
                  <td className="px-4 py-4">
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.id}</p>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{d.type}</td>
                  <td className="px-4 py-4 font-medium">{d.amount}</td>
                  <td className="px-4 py-4">
                    <Status tone={d.tone}>{d.stage}</Status>
                  </td>
                  <td className="px-4 py-4 font-bold">{d.risk}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={d.progress} className="w-20" />
                      <span className="text-xs">{d.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{d.update}</td>
                  <td className="px-4 py-4 text-xs">{d.owner}</td>
                  <td className="px-4 py-4">
                    <MoreHorizontal className="size-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>5 dossiers sur 28</span>
          <div className="flex gap-1">
            <Button size="icon" variant="outline" disabled>
              <ChevronLeft />
            </Button>
            <Button size="icon" variant="outline">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Panel>
    </>
  );
}

const steps = [
  "Information",
  "Données",
  "Questionnaire",
  "Analyse",
  "Évaluation",
  "Avis",
  "Décision",
];
type WorkflowStep = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  target: "individual" | "legal-entity";
};

const workflowSteps: WorkflowStep[] = [
  {
    id: "information",
    label: "Informations",
    description: "Identité et documents de la contrepartie",
    enabled: true,
    target: "legal-entity",
  },
  {
    id: "data",
    label: "Données",
    description: "Données financières et opérationnelles",
    enabled: true,
    target: "legal-entity",
  },
  {
    id: "questionnaire",
    label: "Questionnaire",
    description: "Questions de gouvernance et de risques",
    enabled: true,
    target: "legal-entity",
  },
  {
    id: "analysis",
    label: "Analyse",
    description: "Calcul des indicateurs et ratios",
    enabled: true,
    target: "legal-entity",
  },
  {
    id: "opinion",
    label: "Avis",
    description: "Contributions des parties prenantes",
    enabled: true,
    target: "legal-entity",
  },
  {
    id: "decision",
    label: "Décision",
    description: "Validation finale du dossier",
    enabled: true,
    target: "legal-entity",
  },
];
function Dossier({ back }: { back: () => void }) {
  const [tab, setTab] = useState("Information");
  const activeSteps = steps.filter(
    (step) =>
      step === "Évaluation" ||
      workflowSteps.some((configured) => configured.label === step && configured.enabled),
  );
  return (
    <>
      <button
        onClick={back}
        className="mb-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Retour aux dossiers
      </button>
      <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">Atlas Microfinance</h1>
            <Status tone="warning">Analyse en cours</Status>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Institution de microfinance · DD-2026-084 · Demande de 18,5 M MAD
          </p>
        </div>
        <div className="min-w-52">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Progression globale</span>
            <strong>72 %</strong>
          </div>
          <Progress value={72} />
          <p className="mt-2 text-right text-[11px] text-muted-foreground">
            Mis à jour aujourd’hui à 09:42
          </p>
        </div>
      </div>
      <div className="my-5 overflow-x-auto">
        <div className="flex min-w-[820px]">
          {activeSteps.map((s, i) => (
            <button key={s} onClick={() => setTab(s)} className="group flex flex-1 items-center">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  i < 3
                    ? "border-success bg-success text-success-foreground"
                    : s === tab
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground",
                )}
              >
                {i < 3 ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "ml-2 text-xs font-semibold",
                  s === tab ? "text-primary" : "text-muted-foreground",
                )}
              >
                {s}
              </span>
              {i < activeSteps.length - 1 && <span className="mx-3 h-px flex-1 bg-border" />}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        {tab === "Information" ? (
          <Information />
        ) : tab === "Données" ? (
          <FinancialData />
        ) : tab === "Questionnaire" ? (
          <Questionnaire />
        ) : tab === "Évaluation" ? (
          <Evaluation />
        ) : tab === "Avis" ? (
          <Opinions />
        ) : tab === "Décision" ? (
          <Decision />
        ) : (
          <Analysis />
        )}
        <aside className="space-y-4">
          <Panel>
            <PanelTitle title="Qualité des données" />
            <div className="p-5">
              <div className="mb-2 flex justify-between text-xs">
                <span>Complétude</span>
                <strong>94 %</strong>
              </div>
              <Progress value={94} />
              <div className="mt-4 space-y-3 text-xs">
                <p className="flex items-center gap-2 text-success">
                  <Check className="size-4" /> 47 points validés
                </p>
                <p className="flex items-center gap-2 text-warning-foreground">
                  <CircleAlert className="size-4" /> 3 à vérifier
                </p>
                <p className="flex items-center gap-2 text-destructive">
                  <X className="size-4" /> 2 données manquantes
                </p>
              </div>
            </div>
          </Panel>
          <Panel>
            <PanelTitle title="Actions rapides" />
            <div className="grid gap-2 p-4">
              <Button variant="outline" className="justify-start">
                <FileText /> Voir les documents
              </Button>
              <Button variant="outline" className="justify-start">
                <History /> Historique du dossier
              </Button>
              <Button variant="outline" className="justify-start">
                <UserRound /> Affecter un contributeur
              </Button>
            </div>
          </Panel>
        </aside>
      </div>
    </>
  );
}

function Analysis() {
  const indicators: [string, string, string, string, Tone][] = [
    ["PAR30", "5,8 %", "4,1 %", "+1,7 pts", "warning"],
    ["ROA", "4,2 %", "3,9 %", "+0,3 pt", "success"],
    ["Ratio de solvabilité", "18,5 %", "18,1 %", "+0,4 pt", "success"],
    ["Liquidité immédiate", "22,8 %", "24,4 %", "−1,6 pt", "neutral"],
  ];
  return (
    <Panel>
      <PanelTitle
        title="Analyse financière"
        subtitle="Indicateurs calculés à partir des données validées du T2 2026"
        action={
          <Button variant="outline" size="sm">
            <Download /> Exporter
          </Button>
        }
      />
      <div className="grid gap-4 p-5 md:grid-cols-2">
        {indicators.map(([n, v, p, c, t], i) => (
          <div key={n} className="rounded-md border border-border p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{n}</p>
                <p className="mt-1 text-2xl font-bold">{v}</p>
              </div>
              <Status tone={t}>{t === "warning" ? "À surveiller" : "Satisfaisant"}</Status>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="text-xs text-muted-foreground">
                Période précédente <strong className="text-foreground">{p}</strong>
                <br />
                Variation{" "}
                <strong
                  className={
                    c.startsWith("+") && i !== 0
                      ? "text-success"
                      : i === 0
                        ? "text-destructive"
                        : "text-foreground"
                  }
                >
                  {c}
                </strong>
              </div>
              <div className="flex h-12 items-end gap-1">
                {[32, 44, 38, 55, 50, 70].map((h, j) => (
                  <span
                    key={j}
                    className={cn("w-2 rounded-sm", j === 5 ? "bg-primary" : "bg-secondary")}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-5">
        <h3 className="text-sm font-semibold">Tendance historique — PAR30</h3>
        <div className="mt-4 flex h-28 items-end gap-3 rounded-md bg-muted/40 px-5 pt-5">
          {[3.4, 3.7, 4.1, 4.4, 4.9, 5.8].map((v, i) => (
            <div key={v} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-semibold">{v}%</span>
              <span
                className={cn(
                  "w-full max-w-12 rounded-t-sm",
                  i === 5 ? "bg-destructive" : "bg-primary/55",
                )}
                style={{ height: `${v * 10}px` }}
              />
              <span className="text-[10px] text-muted-foreground">T{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
function Information() {
  return (
    <Panel>
      <PanelTitle title="Informations de la contrepartie" />
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <InfoBlock
          title="Informations générales"
          rows={[
            ["Raison sociale", "Atlas Microfinance SA"],
            ["Activité", "Microfinance et inclusion financière"],
            ["Localisation", "Rabat, Maroc"],
            ["Date de création", "12 mars 2008"],
            ["Taille", "412 collaborateurs"],
          ]}
        />
        <InfoBlock
          title="Gouvernance"
          rows={[
            ["Direction générale", "Nadia Benjelloun"],
            ["Président du conseil", "Karim El Fassi"],
            ["Actionnaire principal", "Holding Atlas (64 %)"],
          ]}
        />
        <div className="md:col-span-2">
          <h3 className="mb-3 text-sm font-semibold">Documents requis</h3>
          <div className="grid gap-2 md:grid-cols-3">
            {[
              ["États financiers 2025", "Disponible", "success"],
              ["Documents juridiques", "Disponible", "success"],
              ["Rapport d’audit", "Manquant", "danger"],
            ].map(([a, b, t]) => (
              <div
                className="flex items-center justify-between rounded-md border border-border p-3"
                key={a}
              >
                <span className="text-xs font-medium">{a}</span>
                <Status tone={t as Tone}>{b}</Status>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
function FinancialData() {
  return (
    <Panel>
      <PanelTitle
        title="Données financières"
        subtitle="Période de reporting : T2 2026"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload />
              Importer
            </Button>
            <Button size="sm">Saisie manuelle</Button>
          </div>
        }
      />
      <div className="p-5">
        <div className="mb-5 rounded-md bg-info-soft p-4">
          <div className="flex justify-between text-sm">
            <strong>82 % des données requises complétées</strong>
            <span>41 / 50</span>
          </div>
          <Progress value={82} className="mt-3" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Bilan", "18 / 18 champs", "Validé"],
            ["Compte de résultat", "12 / 14 champs", "À compléter"],
            ["Flux de trésorerie", "7 / 9 champs", "À vérifier"],
            ["Données métier", "4 / 9 champs", "Incomplet"],
          ].map(([a, b, c]) => (
            <div key={a} className="rounded-md border border-border p-4">
              <div className="flex justify-between">
                <FileCheck2 className="size-5 text-primary" />
                <Status tone={c === "Validé" ? "success" : "warning"}>{c}</Status>
              </div>
              <h3 className="mt-4 text-sm font-semibold">{a}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md border border-destructive/25 bg-danger-soft p-4 text-sm">
          <strong>Erreur de rapprochement</strong>
          <p className="mt-1 text-xs text-muted-foreground">
            Le total de l’actif ne correspond pas au passif + capitaux propres.
          </p>
        </div>
      </div>
    </Panel>
  );
}
function Questionnaire() {
  return (
    <Panel>
      <PanelTitle
        title="Questionnaire d’évaluation"
        subtitle="24 réponses sur 28 · 3 questions obligatoires sans réponse"
      />
      <div className="divide-y divide-border">
        {[
          ["Gouvernance et contrôle interne", 92],
          ["Gestion des risques", 78],
          ["Stratégie et modèle économique", 86],
        ].map(([a, p]) => (
          <div key={a} className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{a}</h3>
              <span className="text-xs font-bold">{p}%</span>
            </div>
            <Progress value={p as number} className="mt-2" />
          </div>
        ))}
        <div className="p-5">
          <p className="text-xs font-bold text-destructive">QUESTION OBLIGATOIRE</p>
          <p className="mt-2 text-sm font-semibold">
            Existe-t-il une politique formelle de gestion des risques ?
          </p>
          <div className="mt-3 flex gap-2">
            {["Oui", "Non", "Partiellement"].map((x) => (
              <Button key={x} variant="outline" size="sm">
                {x}
              </Button>
            ))}
          </div>
          <textarea
            className="mt-3 min-h-20 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            placeholder="Ajouter un commentaire…"
          />
        </div>
      </div>
    </Panel>
  );
}
function Evaluation() {
  return (
    <Panel>
      <PanelTitle
        title="Évaluation du risque"
        subtitle="Résultat expliqué selon la méthodologie active"
      />
      <div className="grid gap-5 p-5 md:grid-cols-[220px_1fr]">
        <div className="rounded-md bg-secondary p-6 text-center">
          <p className="text-xs font-semibold text-muted-foreground">NOTE GLOBALE</p>
          <p className="mt-3 text-5xl font-bold text-primary">B+</p>
          <p className="mt-2 text-sm font-semibold">72 / 100</p>
          <Status tone="warning">Risque modéré</Status>
        </div>
        <div className="space-y-4">
          {[
            ["Solidité financière", 78],
            ["Qualité du portefeuille", 65],
            ["Gouvernance", 81],
            ["Liquidité", 74],
          ].map(([a, v]) => (
            <div key={a}>
              <div className="mb-1 flex justify-between text-xs">
                <span>{a}</span>
                <strong>{v}/100</strong>
              </div>
              <Progress value={v as number} />
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-px border-t border-border bg-border md:grid-cols-2">
        <div className="bg-card p-5">
          <h3 className="text-sm font-semibold text-success">Facteurs positifs</h3>
          <ul className="mt-3 space-y-2 text-xs">
            {[
              "Solvabilité supérieure au seuil",
              "Croissance soutenue du portefeuille",
              "Liquidité adéquate",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <Check className="size-4 text-success" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card p-5">
          <h3 className="text-sm font-semibold text-destructive">Facteurs de risque</h3>
          <ul className="mt-3 space-y-2 text-xs">
            {[
              "Dégradation de la qualité du portefeuille",
              "Concentration géographique élevée",
              "Rentabilité sous pression",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <AlertTriangle className="size-4 text-destructive" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
function Opinions() {
  const opinions: [string, string, string, Tone][] = [
    ["Caciopee", "Analyste", "Favorable", "success"],
    ["N. Berrada", "Direction des risques", "Favorable avec conditions", "warning"],
    ["A. Chraïbi", "Juridique", "En cours", "info"],
    ["Comité de crédit", "Direction", "En attente", "neutral"],
  ];
  return (
    <Panel>
      <PanelTitle
        title="Avis des parties prenantes"
        subtitle="2 favorables · 1 favorable avec conditions · 1 en attente"
      />
      <div className="divide-y divide-border">
        {opinions.map(([n, r, s, t]) => (
          <div key={n} className="flex items-center gap-4 p-5">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-bold">
              {n
                .split(" ")
                .map((x) => x[0] ?? "")
                .join("")}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{n}</p>
              <p className="text-xs text-muted-foreground">{r}</p>
            </div>
            <Status tone={t}>{s}</Status>
          </div>
        ))}
      </div>
    </Panel>
  );
}
function Decision() {
  return (
    <Panel>
      <PanelTitle title="Décision finale" subtitle="Tous les éléments requis sont disponibles" />
      <div className="p-5">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["Approuver", "success"],
            ["Avec conditions", "warning"],
            ["Rejeter", "danger"],
            ["Complément requis", "info"],
          ].map(([a, t]) => (
            <button
              key={a}
              className={cn(
                "rounded-md border p-4 text-left text-sm font-semibold transition hover:border-primary",
                t === "success" && "bg-success/5",
                t === "warning" && "bg-warning/5",
                t === "danger" && "bg-danger-soft",
              )}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-xs font-semibold">
            Montant approuvé
            <Input className="mt-2" defaultValue="18 500 000 MAD" />
          </label>
          <label className="text-xs font-semibold">
            Conditions
            <Input className="mt-2" placeholder="Saisir les conditions…" />
          </label>
        </div>
        <label className="mt-4 block text-xs font-semibold">
          Motivation de la décision
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            placeholder="Documenter la décision…"
          />
        </label>
        <div className="mt-5 flex justify-end">
          <Button>
            Enregistrer la décision <ArrowRight />
          </Button>
        </div>
      </div>
    </Panel>
  );
}
function InfoBlock({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <dl className="divide-y divide-border rounded-md border border-border">
        {rows.map(([a, b]) => (
          <div key={a} className="flex justify-between gap-4 p-3 text-xs">
            <dt className="text-muted-foreground">{a}</dt>
            <dd className="text-right font-medium">{b}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Portfolio({ open }: { open: () => void }) {
  const clients = [
    ["Atlas Microfinance", "IMF", "42,5 M", "B+", "5,8 % PAR30", "2"],
    ["Nova Industrie", "TPME", "31,8 M", "A-", "1,6x DSCR", "0"],
    ["Sahara Agro", "TPME", "24,2 M", "B", "−8,4 % CA", "1"],
    ["Tamwil Coopérative", "Coopérative", "18,7 M", "B", "9,2 % impayés", "3"],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Suivi"
        title="Portefeuille sous surveillance"
        description="Vue consolidée des risques, expositions et données de reporting."
        action={
          <Button variant="outline">
            <Download /> Exporter
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Clients suivis" value="124" detail="8 segments actifs" icon={Users} />
        <Metric
          label="Exposition totale"
          value="684,2 M"
          detail="MAD · +4,2 % sur 12 mois"
          icon={BriefcaseBusiness}
          tone="success"
        />
        <Metric
          label="Performance en baisse"
          value="8"
          detail="6,5 % du portefeuille"
          icon={TrendingDown}
          tone="warning"
        />
        <Metric
          label="Covenants rompus"
          value="5"
          detail="3 clients concernés"
          icon={ShieldAlert}
          tone="danger"
        />
      </div>
      <Panel className="mt-5">
        <PanelTitle
          title="Clients suivis"
          action={
            <Button variant="outline" size="sm">
              <Filter />
              Filtrer
            </Button>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="bg-muted/45 text-[11px] uppercase text-muted-foreground">
                {[
                  "Client",
                  "Type",
                  "Exposition",
                  "Note",
                  "Indicateur principal",
                  "Fraîcheur",
                  "Alertes",
                ].map((x) => (
                  <th key={x} className="px-4 py-3">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((c, i) => (
                <tr key={c[0]} onClick={open} className="cursor-pointer hover:bg-muted/40">
                  <td className="px-4 py-4 font-semibold">{c[0]}</td>
                  <td className="px-4 py-4 text-muted-foreground">{c[1]}</td>
                  <td className="px-4 py-4 font-medium">{c[2]}</td>
                  <td className="px-4 py-4">
                    <Status tone={i === 0 ? "warning" : "success"}>{c[3]}</Status>
                  </td>
                  <td className="px-4 py-4">{c[4]}</td>
                  <td className="px-4 py-4">
                    <Status tone={i === 2 ? "danger" : "success"}>
                      {i === 2 ? "En retard" : "À jour"}
                    </Status>
                  </td>
                  <td className="px-4 py-4 font-bold">{c[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function ClientWorkspace({ back }: { back: () => void }) {
  const [tab, setTab] = useState<ClientTab>("overview");
  const clientTabs: { id: ClientTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Financial Performance" },
    { id: "periods", label: "Reporting Periods" },
    { id: "financing", label: "Financing" },
    { id: "covenants", label: "Covenants & Alerts" },
    { id: "documents", label: "Documents" },
    { id: "history", label: "History" },
  ].filter((item) => {
    if (
      item.id === "overview" ||
      item.id === "financing" ||
      item.id === "covenants" ||
      item.id === "history"
    )
      return true;
    if (item.id === "performance" || item.id === "periods")
      return workflowSteps.some((step) => step.id === "data" && step.enabled);
    if (item.id === "documents")
      return workflowSteps.some((step) => step.id === "information" && step.enabled);
    return true;
  });

  const healthMetrics = [
    { label: "Portfolio", value: "42,5 M", prev: "39,9 M", change: "+6,5 %", trend: "up" },
    { label: "ROA", value: "4,2 %", prev: "3,9 %", change: "+0,3 pt", trend: "up" },
    { label: "PAR30", value: "5,8 %", prev: "4,1 %", change: "+1,7 pts", trend: "down" },
    { label: "Solvability", value: "18,5 %", prev: "18,1 %", change: "+0,4 pt", trend: "up" },
  ];

  const performanceRows = [
    ["Portfolio quality", "PAR30", "5,8 %", "4,1 %", "+1,7 pts", "Above threshold", "warning"],
    ["Profitability", "ROA", "4,2 %", "3,9 %", "+0,3 pt", "Healthy", "success"],
    ["Solvency", "Ratio de solvabilité", "18,5 %", "18,1 %", "+0,4 pt", "Healthy", "success"],
    ["Liquidity", "Liquidité immédiate", "22,8 %", "24,4 %", "-1,6 pt", "Stable", "neutral"],
    ["Operational efficiency", "Marge nette", "14,7 %", "13,9 %", "+0,8 pt", "On track", "success"],
  ];

  const periods = [
    ["Q2 2026", "15/07/2026", "100%", "Validated", "success"],
    ["Q1 2026", "15/04/2026", "100%", "Validated", "success"],
    ["Q4 2025", "18/01/2026", "96%", "Pending review", "warning"],
    ["Q3 2025", "14/10/2025", "88%", "Needs update", "danger"],
  ];

  const financings = [
    {
      name: "Financing #002",
      type: "Public Market Financing",
      approved: "10,0 M MAD",
      outstanding: "6,2 M MAD",
      available: "3,8 M MAD",
      status: "Active",
      maturity: "24 janv. 2028",
    },
    {
      name: "Financing #001",
      type: "Working capital line",
      approved: "8,5 M MAD",
      outstanding: "4,9 M MAD",
      available: "3,6 M MAD",
      status: "Active",
      maturity: "18 déc. 2026",
    },
    {
      name: "Financing #003",
      type: "Guarantee facility",
      approved: "4,0 M MAD",
      outstanding: "1,4 M MAD",
      available: "2,6 M MAD",
      status: "Available",
      maturity: "12 mars 2027",
    },
  ];

  const covenants = [
    ["PAR30", "5,8 %", "< 5,0 %", "Breach", "danger"],
    ["Solvability", "18,5 %", "> 15,0 %", "OK", "success"],
    ["DSCR", "1,08x", "> 1,20x", "Warning", "warning"],
  ];

  const docs = [
    ["Annual financial statements", "Financial", "Q2 2026", "18/09/2026", "Validated", "success"],
    ["Board resolution", "Legal", "Q2 2026", "09/09/2026", "Validated", "success"],
    ["Quarterly covenant pack", "Reporting", "Q2 2026", "07/09/2026", "Missing", "warning"],
  ];

  const history = [
    ["18 sept. 2026", "Q2 financial data validated and monitoring status updated to Watch."],
    ["12 sept. 2026", "PAR30 covenant breach detected; action plan requested."],
    ["05 août 2026", "Facility #002 disbursed for 10.0 M MAD."],
    ["25 juin 2026", "Quarterly reporting package submitted by the client."],
  ];

  return (
    <>
      <button
        onClick={back}
        className="mb-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Retour au portefeuille
      </button>

      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Client acquis
          </p>
          <h1 className="text-3xl font-bold text-foreground">IMF Atlas</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>Institution de microfinance</span>
            <span>•</span>
            <span>Financial Services</span>
            <span>•</span>
            <span>Casablanca</span>
            <span>•</span>
            <Status tone="success">Active</Status>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button>
            <Plus /> Ajouter un financement
          </Button>
          <Button variant="outline">
            <Upload /> Demander des données
          </Button>
          <Button variant="outline">
            <FileText /> Télécharger document
          </Button>
          <Button variant="outline" size="icon" aria-label="Plus d’actions">
            <MoreHorizontal />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Client ID</p>
          <p className="mt-2 text-xl font-bold">IMF-ATLAS-2026</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Relationship owner</p>
          <p className="mt-2 text-xl font-bold">Caciopee</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Date onboarded</p>
          <p className="mt-2 text-xl font-bold">12 mars 2018</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Last reporting period</p>
          <p className="mt-2 text-xl font-bold">Q2 2026</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <div className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase text-muted-foreground">Current monitoring state</p>
            <h2 className="mt-1 text-xl font-bold">Client Status: Watch</h2>
          </div>
          <Status tone="warning">Watch</Status>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-md bg-warning/10 p-3">
            <p className="text-xs text-warning-foreground">Indicators deteriorating</p>
            <p className="mt-2 text-lg font-bold">3</p>
          </div>
          <div className="rounded-md bg-danger-soft p-3">
            <p className="text-xs text-destructive">Covenant breaches</p>
            <p className="mt-2 text-lg font-bold">1</p>
          </div>
          <div className="rounded-md bg-info-soft p-3">
            <p className="text-xs text-primary">Reporting issues</p>
            <p className="mt-2 text-lg font-bold">2</p>
          </div>
          <div className="rounded-md bg-success/10 p-3">
            <p className="text-xs text-success">Data completeness</p>
            <p className="mt-2 text-lg font-bold">96%</p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-b border-border">
        <nav className="flex flex-wrap gap-2">
          {clientTabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "rounded-t-md border-b-2 px-3 py-2 text-sm font-medium transition",
                tab === item.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 space-y-6">
        {tab === "overview" && (
          <>
            <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
              <Panel>
                <PanelTitle
                  title="Current Financial Position"
                  subtitle="Most important KPIs for the current reporting period"
                />
                <div className="grid gap-4 p-5 md:grid-cols-2">
                  {healthMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-md border border-border bg-muted/20 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold",
                            metric.trend === "up"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning-foreground",
                          )}
                        >
                          {metric.trend === "up" ? (
                            <TrendingUp className="size-3" />
                          ) : (
                            <TrendingDown className="size-3" />
                          )}
                          {metric.change}
                        </span>
                      </div>
                      <div className="mt-3 flex items-end justify-between">
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <span className="text-xs text-muted-foreground">Prev {metric.prev}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel>
                <PanelTitle title="Exposure Summary" subtitle="Current risk to the institution" />
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Total exposure</p>
                    <p className="mt-1 text-3xl font-bold">12,4 M MAD</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Approved</p>
                      <p className="mt-1 text-lg font-semibold">18,5 M</p>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Outstanding</p>
                      <p className="mt-1 text-lg font-semibold">9,8 M</p>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Available</p>
                      <p className="mt-1 text-lg font-semibold">8,7 M</p>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Utilization</p>
                      <p className="mt-1 text-lg font-semibold">67%</p>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.3fr_0.9fr]">
              <Panel>
                <PanelTitle
                  title="Performance Trend"
                  subtitle="Selected indicators over the last 8 quarters"
                />
                <div className="p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {["Portfolio", "PAR30", "ROA", "Solvability", "Liquidity"].map((metric) => (
                      <button
                        key={metric}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                      >
                        {metric}
                      </button>
                    ))}
                  </div>
                  <div className="flex h-44 items-end gap-3 rounded-md bg-muted/20 px-3 pb-3 pt-5">
                    {[42, 48, 52, 51, 56, 58, 60, 64].map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center justify-end gap-2"
                      >
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-primary/70 to-primary/30"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">Q{8 - index}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>

              <Panel>
                <PanelTitle
                  title="Active Alerts"
                  subtitle="Most important events requiring attention"
                  action={
                    <Button variant="ghost" size="sm">
                      View all alerts
                    </Button>
                  }
                />
                <div className="divide-y divide-border p-2">
                  {[
                    ["PAR30 covenant breached", "5,8% > 5,0%", "18 sept. 2026", "danger"],
                    [
                      "Reporting data incomplete",
                      "3 mandatory fields missing",
                      "16 sept. 2026",
                      "warning",
                    ],
                    ["Document expiration", "Board minutes due", "09 sept. 2026", "info"],
                  ].map(([title, meta, date, tone]) => (
                    <div key={title} className="flex items-start gap-3 p-3">
                      <span
                        className={cn(
                          "mt-1 flex size-8 items-center justify-center rounded-md",
                          tone === "danger"
                            ? "bg-danger-soft text-destructive"
                            : tone === "warning"
                              ? "bg-warning/15 text-warning-foreground"
                              : "bg-info-soft text-primary",
                        )}
                      >
                        <AlertTriangle className="size-4" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground">{meta}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">Detected {date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <Panel>
                <PanelTitle
                  title="Upcoming Actions"
                  subtitle="Operational follow-ups for the relationship"
                />
                <div className="space-y-3 p-5">
                  {[
                    ["Reporting period due", "Q3 2026 package due in 9 days", "warning"],
                    ["Covenant review", "DSCR review requested by risk committee", "danger"],
                    ["Document review", "Insurance certificate expires on 30/11", "info"],
                  ].map(([label, desc, tone]) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-md border border-border p-3"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-6 items-center justify-center rounded-md",
                          tone === "danger"
                            ? "bg-danger-soft text-destructive"
                            : tone === "warning"
                              ? "bg-warning/15 text-warning-foreground"
                              : "bg-info-soft text-primary",
                        )}
                      >
                        <Clock3 className="size-3.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel>
                <PanelTitle title="Data Quality" subtitle="Latest reporting status" />
                <div className="p-5 space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Completeness</span>
                      <span className="font-semibold">96%</span>
                    </div>
                    <Progress value={96} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Validation status</span>
                      <span className="font-semibold text-success">Validated</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Data freshness</span>
                      <span className="font-semibold">11 days</span>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          </>
        )}

        {tab === "performance" && (
          <Panel>
            <PanelTitle
              title="Financial Performance"
              subtitle="Detailed monitoring by business category"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                    <th className="pb-3 pr-4">Category</th>
                    <th className="pb-3 pr-4">Metric</th>
                    <th className="pb-3 pr-4">Current</th>
                    <th className="pb-3 pr-4">Previous</th>
                    <th className="pb-3 pr-4">Variation</th>
                    <th className="pb-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {performanceRows.map(
                    ([category, metric, current, previous, variation, status, tone]) => (
                      <tr key={metric} className="align-top">
                        <td className="py-3 pr-4 font-medium">{category}</td>
                        <td className="py-3 pr-4">{metric}</td>
                        <td className="py-3 pr-4 font-semibold">{current}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{previous}</td>
                        <td className="py-3 pr-4">{variation}</td>
                        <td className="py-3 pr-4">
                          <Status tone={tone as Tone}>{status}</Status>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {tab === "periods" && (
          <Panel>
            <PanelTitle
              title="Reporting Periods"
              subtitle="Financial package submissions and validation history"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                    <th className="pb-3 pr-4">Period</th>
                    <th className="pb-3 pr-4">Submission</th>
                    <th className="pb-3 pr-4">Completeness</th>
                    <th className="pb-3 pr-4">Validation</th>
                    <th className="pb-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {periods.map(([period, date, completeness, validation, tone]) => (
                    <tr key={period}>
                      <td className="py-3 pr-4 font-semibold">{period}</td>
                      <td className="py-3 pr-4">{date}</td>
                      <td className="py-3 pr-4">{completeness}</td>
                      <td className="py-3 pr-4">{validation}</td>
                      <td className="py-3 pr-4">
                        <Status tone={tone as Tone}>
                          {tone === "success"
                            ? "Validated"
                            : tone === "warning"
                              ? "Review"
                              : "Urgent"}
                        </Status>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {tab === "financing" && (
          <>
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {financings.map((item) => (
                  <Panel key={item.name} className="p-5">
                    <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                      <div>
                        <p className="text-xs uppercase text-muted-foreground">Facility</p>
                        <h3 className="mt-1 text-lg font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                      <Status tone={item.status === "Active" ? "success" : "info"}>
                        {item.status}
                      </Status>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs text-muted-foreground">Approved</p>
                        <p className="mt-1 text-lg font-semibold">{item.approved}</p>
                      </div>
                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs text-muted-foreground">Outstanding</p>
                        <p className="mt-1 text-lg font-semibold">{item.outstanding}</p>
                      </div>
                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs text-muted-foreground">Available</p>
                        <p className="mt-1 text-lg font-semibold">{item.available}</p>
                      </div>
                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs text-muted-foreground">Maturity</p>
                        <p className="mt-1 text-lg font-semibold">{item.maturity}</p>
                      </div>
                    </div>
                  </Panel>
                ))}
              </div>

              <Panel>
                <PanelTitle
                  title="Exposure Overview"
                  subtitle="Current financing risk to this client"
                />
                <div className="space-y-5 p-5">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Total exposure</p>
                    <p className="mt-1 text-3xl font-bold">12,4 M MAD</p>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Credit exposure</p>
                      <p className="mt-1 text-xl font-bold">10,2 M</p>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Guarantee exposure</p>
                      <p className="mt-1 text-xl font-bold">2,2 M</p>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Utilization</p>
                      <p className="mt-1 text-xl font-bold">71%</p>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          </>
        )}

        {tab === "covenants" && (
          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel>
              <PanelTitle
                title="Active Covenants"
                subtitle="Current thresholds and monitoring status"
              />
              <div className="overflow-x-auto p-5">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                      <th className="pb-3 pr-4">Covenant</th>
                      <th className="pb-3 pr-4">Current</th>
                      <th className="pb-3 pr-4">Threshold</th>
                      <th className="pb-3 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {covenants.map(([name, current, threshold, status, tone]) => (
                      <tr key={name}>
                        <td className="py-3 pr-4 font-medium">{name}</td>
                        <td className="py-3 pr-4">{current}</td>
                        <td className="py-3 pr-4">{threshold}</td>
                        <td className="py-3 pr-4">
                          <Status tone={tone as Tone}>{status}</Status>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel>
              <PanelTitle title="Alerts" subtitle="Lifecycle from detection to resolution" />
              <div className="space-y-3 p-5">
                {[
                  [
                    "PAR30 covenant breach",
                    "Critical",
                    "5,8% > 5,0%",
                    "Detected 18/09/2026",
                    "danger",
                  ],
                  [
                    "Data missing",
                    "Medium",
                    "3 required fields",
                    "Acknowledged 16/09/2026",
                    "warning",
                  ],
                  ["Board document review", "Low", "Minutes to validate", "In progress", "info"],
                ].map(([label, severity, metric, date, tone]) => (
                  <div key={label} className="rounded-md border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{label}</p>
                      <Status tone={tone as Tone}>{severity}</Status>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{metric}</p>
                    <p className="mt-2 text-[11px] text-muted-foreground">{date}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {tab === "documents" && (
          <Panel>
            <PanelTitle
              title="Client Documents"
              subtitle="Legal, financial, reporting and financing records"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                    <th className="pb-3 pr-4">Document</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 pr-4">Period</th>
                    <th className="pb-3 pr-4">Upload date</th>
                    <th className="pb-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {docs.map(([name, type, period, date, status, tone]) => (
                    <tr key={name}>
                      <td className="py-3 pr-4 font-medium">{name}</td>
                      <td className="py-3 pr-4">{type}</td>
                      <td className="py-3 pr-4">{period}</td>
                      <td className="py-3 pr-4">{date}</td>
                      <td className="py-3 pr-4">
                        <Status tone={tone as Tone}>{status}</Status>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {tab === "history" && (
          <Panel>
            <PanelTitle
              title="Relationship History"
              subtitle="Key events and milestones over time"
            />
            <div className="p-5">
              <div className="space-y-4 border-l border-border pl-5">
                {history.map(([date, event]) => (
                  <div key={date} className="relative">
                    <span className="absolute -left-[1.82rem] top-1.5 size-3 rounded-full border-4 border-background bg-primary" />
                    <p className="text-xs font-bold uppercase text-muted-foreground">{date}</p>
                    <p className="mt-2 text-sm text-foreground">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        )}
      </div>
    </>
  );
}

type RuleCondition = { model: string; attribute: string; operator: string; value: string };

function ConfigSelect({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

function AttributeProfileEditor() {
  const [profile, setProfile] = useState("IMF");
  const [attributes, setAttributes] = useState([
    ["legal_name", "Raison sociale", "Texte", true, true, "Identité"],
    ["balance_sheet", "Bilan", "Document / import", true, true, "Financier"],
    ["portfolio_at_risk", "PAR30", "Pourcentage", true, false, "Risque"],
    ["board_minutes", "Procès-verbal du conseil", "Document", false, true, "Gouvernance"],
    [
      "geographic_concentration",
      "Concentration géographique",
      "Pourcentage",
      false,
      false,
      "Risque",
    ],
  ] as [string, string, string, boolean, boolean, string][]);

  const toggleAttribute = (id: string, checked: boolean) =>
    setAttributes((current) =>
      current.map((attribute) =>
        attribute[0] === id
          ? ([...attribute.slice(0, 3), checked, attribute[4], attribute[5]] as [
              string,
              string,
              string,
              boolean,
              boolean,
              string,
            ])
          : attribute,
      ),
    );
  const toggleRequired = (id: string, required: boolean) =>
    setAttributes((current) =>
      current.map((attribute) =>
        attribute[0] === id
          ? [attribute[0], attribute[1], attribute[2], attribute[3], required, attribute[5]]
          : attribute,
      ),
    );

  return (
    <Panel>
      <PanelTitle
        title="Modèles de données"
        subtitle="Activez les attributs de la bibliothèque globale pour chaque profil de contrepartie"
      />
      <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-end md:justify-between">
        <label className="block w-full max-w-xs text-xs font-semibold">
          Profil de contrepartie
          <div className="mt-2">
            <ConfigSelect value={profile} onValueChange={setProfile}>
              <SelectItem value="IMF">IMF · Institution de microfinance</SelectItem>
              <SelectItem value="TPME">TPME · Petite et moyenne entreprise</SelectItem>
              <SelectItem value="BANQUE">Banque · Institution financière</SelectItem>
            </ConfigSelect>
          </div>
        </label>
        <div className="rounded-md bg-info-soft px-3 py-2 text-xs text-primary">
          {attributes.filter(([, , , enabled]) => enabled).length} attributs actifs pour {profile}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/45 text-[11px] uppercase text-muted-foreground">
            <tr>
              {["Attribut", "Nom technique", "Type", "Activité", "Obligation", "Catégorie"].map(
                (heading) => (
                  <th key={heading} className="px-5 py-3">
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {attributes.map(([id, label, type, enabled, required, category]) => (
              <tr key={id} className="hover:bg-muted/40">
                <td className="px-5 py-4 font-semibold">{label}</td>
                <td className="px-5 py-4 text-xs text-muted-foreground">{id}</td>
                <td className="px-5 py-4">{type}</td>
                <td className="px-5 py-4">
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => toggleAttribute(id, checked)}
                    aria-label={`Activer ${label}`}
                  />
                </td>
                <td className="px-5 py-4">
                  <Switch
                    checked={required}
                    onCheckedChange={(checked) => toggleRequired(id, checked)}
                    aria-label={`${label} obligatoire`}
                  />
                </td>
                <td className="px-5 py-4">
                  <Status tone={enabled ? "success" : "neutral"}>{category}</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function FormulaBuilder() {
  const [blocks, setBlocks] = useState([
    { model: "Bilan", attribute: "Dettes", operator: "/" },
    { model: "Compte de résultat", attribute: "Résultat net", operator: "+" },
  ]);
  const updateBlock = (index: number, key: "model" | "attribute" | "operator", value: string) =>
    setBlocks((current) =>
      current.map((block, blockIndex) =>
        blockIndex === index ? { ...block, [key]: value } : block,
      ),
    );

  return (
    <Panel>
      <PanelTitle
        title="Indicateurs & éditeur de formules"
        subtitle="Construisez un ratio avec les modèles et attributs disponibles"
        action={
          <Button size="sm">
            <Plus /> Nouvel indicateur
          </Button>
        }
      />
      <div className="space-y-4 p-5">
        <div className="rounded-md bg-muted/45 p-4 text-sm">
          <span className="font-semibold">Aperçu : </span>
          {blocks.map((block, index) => (
            <span key={index}>
              {index > 0 && ` ${block.operator} `}
              <span className="font-semibold text-primary">{block.attribute}</span>
            </span>
          ))}
        </div>
        {blocks.map((block, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-md border border-border p-4 md:grid-cols-[1fr_1fr_120px_auto] md:items-end"
          >
            <label className="text-xs font-semibold">
              Modèle
              <div className="mt-2">
                <ConfigSelect
                  value={block.model}
                  onValueChange={(value) => updateBlock(index, "model", value)}
                >
                  <SelectItem value="Bilan">Bilan</SelectItem>
                  <SelectItem value="Compte de résultat">Compte de résultat</SelectItem>
                  <SelectItem value="Données métier">Données métier</SelectItem>
                </ConfigSelect>
              </div>
            </label>
            <label className="text-xs font-semibold">
              Attribut
              <div className="mt-2">
                <ConfigSelect
                  value={block.attribute}
                  onValueChange={(value) => updateBlock(index, "attribute", value)}
                >
                  <SelectItem value="Dettes">Dettes</SelectItem>
                  <SelectItem value="Résultat net">Résultat net</SelectItem>
                  <SelectItem value="Actifs">Actifs</SelectItem>
                  <SelectItem value="Portefeuille">Portefeuille</SelectItem>
                </ConfigSelect>
              </div>
            </label>
            <label className="text-xs font-semibold">
              Opérateur
              <div className="mt-2">
                <ConfigSelect
                  value={block.operator}
                  onValueChange={(value) => updateBlock(index, "operator", value)}
                >
                  <SelectItem value="+">+</SelectItem>
                  <SelectItem value="-">−</SelectItem>
                  <SelectItem value="*">×</SelectItem>
                  <SelectItem value="/">÷</SelectItem>
                </ConfigSelect>
              </div>
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setBlocks((current) => current.filter((_, blockIndex) => blockIndex !== index))
              }
              disabled={blocks.length === 1}
              aria-label="Supprimer le bloc"
            >
              <X />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() =>
            setBlocks((current) => [
              ...current,
              { model: "Bilan", attribute: "Actifs", operator: "+" },
            ])
          }
        >
          <Plus /> Ajouter un bloc
        </Button>
      </div>
    </Panel>
  );
}

function WorkflowConfigurator() {
  const [selectedProfile, setSelectedProfile] = useState("IMF");
  const [workflow, setWorkflow] = useState<"due-diligence" | "collection">("due-diligence");
  const collectionSteps: WorkflowStep[] = [
    {
      id: "request",
      label: "Demande de données",
      description: "Définir la période et les données attendues",
      enabled: true,
      target: "legal-entity",
    },
    {
      id: "submission",
      label: "Soumission",
      description: "Réception des données par le profil assigné",
      enabled: true,
      target: "legal-entity",
    },
    {
      id: "validation",
      label: "Contrôle et validation",
      description: "Vérifier la complétude et la cohérence",
      enabled: true,
      target: "legal-entity",
    },
    {
      id: "reminder",
      label: "Relance",
      description: "Notifier les contributeurs en retard",
      enabled: true,
      target: "legal-entity",
    },
  ];
  const profiles = ["IMF", "TPME", "BANQUE"];
  const [configurations, setConfigurations] = useState<
    Record<string, Record<string, WorkflowStep[]>>
  >(() =>
    Object.fromEntries(
      profiles.map((profile) => [
        profile,
        {
          "due-diligence": workflowSteps.map((step) => ({ ...step })),
          collection: collectionSteps.map((step) => ({ ...step })),
        },
      ]),
    ),
  );
  const activeSteps = configurations[selectedProfile][workflow];
  const updateStep = (id: string, changes: Partial<WorkflowStep>) =>
    setConfigurations((current) => ({
      ...current,
      [selectedProfile]: {
        ...current[selectedProfile],
        [workflow]: current[selectedProfile][workflow].map((step) =>
          step.id === id ? { ...step, ...changes } : step,
        ),
      },
    }));

  return (
    <Panel>
      <PanelTitle
        title="Processus"
        subtitle="Configurez les étapes prédéfinies pour chaque profil de contrepartie"
      />
      <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-end">
        <div className="flex rounded-md border border-border p-1 text-sm">
          <button
            className={cn(
              "rounded px-3 py-2",
              workflow === "due-diligence" && "bg-primary text-primary-foreground",
            )}
            onClick={() => {
              setWorkflow("due-diligence");
            }}
          >
            Workflow de due diligence
          </button>
          <button
            className={cn(
              "rounded px-3 py-2",
              workflow === "collection" && "bg-primary text-primary-foreground",
            )}
            onClick={() => setWorkflow("collection")}
          >
            Workflow de collection par saisie
          </button>
        </div>
        <label className="block w-full max-w-xs text-xs font-semibold">
          Profil de contrepartie
          <div className="mt-2">
            <ConfigSelect value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectItem value="IMF">IMF</SelectItem>
              <SelectItem value="TPME">TPME</SelectItem>
              <SelectItem value="BANQUE">Banque</SelectItem>
            </ConfigSelect>
          </div>
        </label>
      </div>
      <div className="divide-y divide-border">
        {activeSteps.map((step, index) => (
          <div key={step.id} className="grid gap-4 p-5 lg:grid-cols-4 lg:items-start">
            <Switch
              checked={step.enabled}
              onCheckedChange={(checked) => updateStep(step.id, { enabled: checked })}
              aria-label={`Activer ${step.label}`}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold">{step.label}</p>
              </div>
              <p className="mt-1 pl-8 text-xs text-muted-foreground">{step.description}</p>
            </div>
            <label className="text-xs font-semibold">
              Assignation Personne Physique
              <div className="mt-2">
                <ConfigSelect
                  value={step.target}
                  onValueChange={(value) =>
                    updateStep(step.id, { target: value as WorkflowStep["target"] })
                  }
                >
                  <SelectItem value="individual">Gestionnaire</SelectItem>
                  <SelectItem value="legal-entity">Responsable</SelectItem>
                </ConfigSelect>
              </div>
            </label>
            <label className="text-xs font-semibold">
              Assignation Personne Morale
              <div className="mt-2">
                <ConfigSelect
                  value={step.target}
                  onValueChange={(value) =>
                    updateStep(step.id, { target: value as WorkflowStep["target"] })
                  }
                >
                  <SelectItem value="individual">Service client</SelectItem>
                  <SelectItem value="legal-entity">Comité</SelectItem>
                </ConfigSelect>
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border bg-muted/25 px-5 py-3 text-xs text-muted-foreground">
        <span>
          {activeSteps.filter((step) => step.enabled).length} étapes actives pour {selectedProfile}
        </span>
        <Button size="sm">Enregistrer le workflow</Button>
      </div>
    </Panel>
  );
}

function RuleBuilder({
  title = "Règle métier",
  subtitle = "Définissez une condition et l’action associée",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [conditions, setConditions] = useState<RuleCondition[]>([
    { model: "Données métier", attribute: "PAR30", operator: ">", value: "5" },
  ]);
  const [action, setAction] = useState("Déclencher une alerte");
  const updateCondition = (index: number, key: keyof RuleCondition, value: string) =>
    setConditions((current) =>
      current.map((condition, conditionIndex) =>
        conditionIndex === index ? { ...condition, [key]: value } : condition,
      ),
    );
  return (
    <Panel>
      <PanelTitle title={title} subtitle={subtitle} />
      <div className="space-y-4 p-5">
        {conditions.map((condition, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-md border border-border p-4 lg:flex-row lg:items-end"
          >
            <span className="pb-2 text-xs font-bold text-primary">
              {index === 0 ? (
                "SI"
              ) : (
                <ConfigSelect value="AND" onValueChange={() => undefined}>
                  <SelectItem value="AND">ET</SelectItem>
                  <SelectItem value="OR">OU</SelectItem>
                </ConfigSelect>
              )}
            </span>
            <label className="flex-1 text-xs font-semibold">
              Modèle / attribut
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <ConfigSelect
                  value={condition.model}
                  onValueChange={(value) => updateCondition(index, "model", value)}
                >
                  <SelectItem value="Données métier">Données métier</SelectItem>
                  <SelectItem value="Bilan">Bilan</SelectItem>
                  <SelectItem value="Compte de résultat">Compte de résultat</SelectItem>
                </ConfigSelect>
                <ConfigSelect
                  value={condition.attribute}
                  onValueChange={(value) => updateCondition(index, "attribute", value)}
                >
                  <SelectItem value="PAR30">PAR30</SelectItem>
                  <SelectItem value="DSCR">DSCR</SelectItem>
                  <SelectItem value="Solvabilité">Solvabilité</SelectItem>
                </ConfigSelect>
              </div>
            </label>
            <label className="w-full text-xs font-semibold lg:w-28">
              Opérateur
              <div className="mt-2">
                <ConfigSelect
                  value={condition.operator}
                  onValueChange={(value) => updateCondition(index, "operator", value)}
                >
                  <SelectItem value=">">&gt;</SelectItem>
                  <SelectItem value="<">&lt;</SelectItem>
                  <SelectItem value="=">=</SelectItem>
                  <SelectItem value="contains">contient</SelectItem>
                </ConfigSelect>
              </div>
            </label>
            <label className="w-full text-xs font-semibold lg:w-32">
              Valeur
              <Input
                className="mt-2"
                value={condition.value}
                onChange={(event) => updateCondition(index, "value", event.target.value)}
              />
            </label>
            {conditions.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setConditions((current) =>
                    current.filter((_, conditionIndex) => conditionIndex !== index),
                  )
                }
                aria-label="Supprimer la condition"
              >
                <X />
              </Button>
            )}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setConditions((current) => [
                ...current,
                { model: "Données métier", attribute: "DSCR", operator: ">", value: "1,2" },
              ])
            }
          >
            <Plus /> Ajouter une condition
          </Button>
          <span className="text-xs text-muted-foreground">
            Les conditions sont combinées avec ET
          </span>
        </div>
        <div className="flex flex-col gap-3 rounded-md bg-info-soft p-4 md:flex-row md:items-center">
          <span className="text-xs font-bold text-primary">ALORS</span>
          <label className="w-full max-w-sm text-xs font-semibold">
            Action
            <div className="mt-2">
              <ConfigSelect value={action} onValueChange={setAction}>
                <SelectItem value="Déclencher une alerte">Déclencher une alerte</SelectItem>
                <SelectItem value="Statut = Refusé">Statut = Refusé</SelectItem>
                <SelectItem value="Demander une revue">Demander une revue</SelectItem>
              </ConfigSelect>
            </div>
          </label>
        </div>
        <div className="flex justify-end">
          <Button>Enregistrer la règle</Button>
        </div>
      </div>
    </Panel>
  );
}

function MetricsWorkspace() {
  const [section, setSection] = useState("ratios");
  const sections = [
    ["ratios", "Ratios"],
    ["covenants", "Covenants"],
    ["alerts", "Alertes"],
    ["methodologies", "Méthodologies d’évaluation"],
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {sections.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={cn(
              "rounded-t-md border-b-2 px-3 py-2 text-sm",
              section === id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {section === "ratios" && <FormulaBuilder />}
      {section === "covenants" && (
        <RuleBuilder
          title="Covenants"
          subtitle="Paramétrez les seuils et les actions par profil de contrepartie"
        />
      )}
      {section === "alerts" && (
        <RuleBuilder
          title="Alertes"
          subtitle="Ajoutez et supprimez les règles de déclenchement métier"
        />
      )}
      {section === "methodologies" && (
        <Panel>
          <PanelTitle
            title="Méthodologies d’évaluation"
            subtitle="Regroupez les ratios utilisés par profil de contrepartie"
          />
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div className="rounded-md border border-border p-4">
              <p className="text-xs font-semibold text-muted-foreground">Profil IMF</p>
              <h3 className="mt-1 font-semibold">JAIDA IMF 2026</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Status tone="info">PAR30</Status>
                <Status tone="info">ROA</Status>
                <Status tone="info">Solvabilité</Status>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Modifier le regroupement
              </Button>
            </div>
            <div className="rounded-md border border-border p-4">
              <p className="text-xs font-semibold text-muted-foreground">Profil TPME</p>
              <h3 className="mt-1 font-semibold">Risk SME 2026</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <Status tone="info">DSCR</Status>
                <Status tone="info">Marge EBITDA</Status>
                <Status tone="info">Endettement</Status>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Modifier le regroupement
              </Button>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}

function QuestionnaireConfigurator() {
  const [profile, setProfile] = useState("IMF");
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([
    ["Politique de gestion des risques", "Oui / Non / Partiellement", "Gouvernance", true],
    ["Comité d’audit actif", "Oui / Non", "Gouvernance", true],
    ["Commentaires sur les incidents récents", "Texte long", "Risques", false],
  ] as [string, string, string, boolean][]);
  return (
    <>
      <Panel>
        <PanelTitle
          title="Questionnaires"
          subtitle="Sélectionnez un profil pour paramétrer ses questions"
        />
        <div className="border-b border-border p-5">
          <label className="block max-w-xs text-xs font-semibold">
            Profil de questionnaire
            <div className="mt-2">
              <ConfigSelect
                value={profile}
                onValueChange={(value) => {
                  setProfile(value);
                  setOpen(true);
                }}
              >
                <SelectItem value="IMF">IMF</SelectItem>
                <SelectItem value="TPME">TPME</SelectItem>
                <SelectItem value="BANQUE">Banque</SelectItem>
              </ConfigSelect>
            </div>
          </label>
        </div>
        <div className="divide-y divide-border">
          {questions.map(([question, type, category, required]) => (
            <div key={question} className="flex items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{question}</p>
                <p className="text-xs text-muted-foreground">
                  {category} · {type}
                </p>
              </div>
              <Status tone={required ? "warning" : "neutral"}>
                {required ? "Obligatoire" : "Optionnelle"}
              </Status>
              <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                Modifier
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end p-5">
          <Button onClick={() => setOpen(true)}>
            <Plus /> Ajouter une question
          </Button>
        </div>
      </Panel>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-semibold">Paramétrer le questionnaire {profile}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Type de réponse, catégorie et obligation
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                <X />
              </Button>
            </div>
            <div className="space-y-3 p-5">
              {questions.map(([question, type, category, required], index) => (
                <div
                  key={question}
                  className="grid gap-3 rounded-md border border-border p-3 md:grid-cols-[1fr_150px_140px_auto]"
                >
                  <Input
                    value={question}
                    onChange={(event) =>
                      setQuestions((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index
                            ? [event.target.value, item[1], item[2], item[3]]
                            : item,
                        ),
                      )
                    }
                  />
                  <ConfigSelect
                    value={type}
                    onValueChange={(value) =>
                      setQuestions((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? [item[0], value, item[2], item[3]] : item,
                        ),
                      )
                    }
                  >
                    <SelectItem value="Oui / Non">Oui / Non</SelectItem>
                    <SelectItem value="Oui / Non / Partiellement">
                      Oui / Non / Partiellement
                    </SelectItem>
                    <SelectItem value="Choix multiple">Choix multiple</SelectItem>
                    <SelectItem value="Texte long">Texte long</SelectItem>
                  </ConfigSelect>
                  <ConfigSelect
                    value={category}
                    onValueChange={(value) =>
                      setQuestions((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? [item[0], item[1], value, item[3]] : item,
                        ),
                      )
                    }
                  >
                    <SelectItem value="Gouvernance">Gouvernance</SelectItem>
                    <SelectItem value="Risques">Risques</SelectItem>
                    <SelectItem value="Financier">Financier</SelectItem>
                  </ConfigSelect>
                  <Switch
                    checked={required}
                    onCheckedChange={(checked) =>
                      setQuestions((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? [item[0], item[1], item[2], checked] : item,
                        ),
                      )
                    }
                    aria-label="Question obligatoire"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 border-t border-border p-5">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setOpen(false)}>Enregistrer</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductConfigurator() {
  type Product = {
    id: number;
    profile: string;
    name: string;
    type: string;
    currency: string;
    range: string;
    active: boolean;
  };
  const [profile, setProfile] = useState("IMF");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      profile: "IMF",
      name: "Prêt de trésorerie",
      type: "Crédit",
      currency: "MAD",
      range: "2 M - 20 M",
      active: true,
    },
    {
      id: 2,
      profile: "IMF",
      name: "Garantie portefeuille",
      type: "Garantie",
      currency: "MAD",
      range: "1 M - 10 M",
      active: true,
    },
    {
      id: 3,
      profile: "TPME",
      name: "Financement public",
      type: "Financement",
      currency: "MAD",
      range: "5 M - 50 M",
      active: true,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState({ name: "", type: "Crédit", currency: "MAD", range: "" });
  const visibleProducts = products.filter((product) => product.profile === profile);
  const openProduct = (product?: Product) => {
    setEditingId(product?.id ?? null);
    setDraft(
      product
        ? {
            name: product.name,
            type: product.type,
            currency: product.currency,
            range: product.range,
          }
        : { name: "", type: "Crédit", currency: "MAD", range: "" },
    );
    setDialogOpen(true);
  };
  const saveProduct = () => {
    if (!draft.name.trim()) return;
    setProducts((current) =>
      editingId === null
        ? [...current, { id: Date.now(), profile, ...draft, active: true }]
        : current.map((product) => (product.id === editingId ? { ...product, ...draft } : product)),
    );
    setDialogOpen(false);
  };
  return (
    <>
      <Panel>
        <PanelTitle
          title="Produits de financement"
          subtitle="Ajoutez, modifiez et supprimez les produits disponibles pour chaque type de contrepartie"
          action={
            <Button size="sm" onClick={() => openProduct()}>
              <Plus /> Ajouter un produit
            </Button>
          }
        />
        <div className="border-b border-border p-5">
          <label className="block max-w-xs text-xs font-semibold">
            Type de contrepartie
            <div className="mt-2">
              <ConfigSelect value={profile} onValueChange={setProfile}>
                <SelectItem value="IMF">IMF · Institution de microfinance</SelectItem>
                <SelectItem value="TPME">TPME · Petite et moyenne entreprise</SelectItem>
                <SelectItem value="BANQUE">Banque · Institution financière</SelectItem>
              </ConfigSelect>
            </div>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-muted/45 text-[11px] uppercase text-muted-foreground">
              <tr>
                {["Produit", "Type", "Devise", "Plage", "Statut", "Actions"].map((heading) => (
                  <th key={heading} className="px-5 py-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-4 font-semibold">{product.name}</td>
                  <td className="px-5 py-4">{product.type}</td>
                  <td className="px-5 py-4">{product.currency}</td>
                  <td className="px-5 py-4">{product.range}</td>
                  <td className="px-5 py-4">
                    <Switch
                      checked={product.active}
                      onCheckedChange={(active) =>
                        setProducts((current) =>
                          current.map((item) =>
                            item.id === product.id ? { ...item, active } : item,
                          ),
                        )
                      }
                    />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {product.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openProduct(product)}>
                        Modifier
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setProducts((current) => current.filter((item) => item.id !== product.id))
                        }
                        aria-label={`Supprimer ${product.name}`}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    Aucun produit pour ce profil.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId === null ? "Ajouter un produit" : "Modifier le produit"}
            </DialogTitle>
            <DialogDescription>Ce produit sera associé au profil {profile}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <label className="text-xs font-semibold">
              Nom du produit
              <Input
                className="mt-2"
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold">
                Type
                <div className="mt-2">
                  <ConfigSelect
                    value={draft.type}
                    onValueChange={(value) => setDraft({ ...draft, type: value })}
                  >
                    <SelectItem value="Crédit">Crédit</SelectItem>
                    <SelectItem value="Financement">Financement</SelectItem>
                    <SelectItem value="Garantie">Garantie</SelectItem>
                  </ConfigSelect>
                </div>
              </label>
              <label className="text-xs font-semibold">
                Devise
                <div className="mt-2">
                  <ConfigSelect
                    value={draft.currency}
                    onValueChange={(value) => setDraft({ ...draft, currency: value })}
                  >
                    <SelectItem value="MAD">MAD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </ConfigSelect>
                </div>
              </label>
            </div>
            <label className="text-xs font-semibold">
              Plage de financement
              <Input
                className="mt-2"
                placeholder="2 M - 20 M"
                value={draft.range}
                onChange={(event) => setDraft({ ...draft, range: event.target.value })}
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={saveProduct}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ConfigurationWorkspace() {
  const [section, setSection] = useState<ConfigSection>("counterparties");

  const sections: { id: ConfigSection; label: string }[] = [
    { id: "counterparties", label: "Modèles de données" },
    { id: "templates", label: "Processus" },
    { id: "metrics", label: "Métriques" },
    { id: "questionnaires", label: "Questionnaires" },
    { id: "products", label: "Produits de financement" },
  ];

  const summaryCards = [
    ["Types de contreparties", "5", "Actifs", "success"],
    ["Indicateurs configurés", "48", "Validation OK", "success"],
    ["Méthodes actives", "12", "3 en validation", "warning"],
    ["Produits de financement", "9", "2 à revoir", "info"],
  ];

  const counterparties = [
    ["IMF", "Institution de microfinance", "Actif", "48 champs", "2 méthodes"],
    ["TPME", "Petite & moyenne entreprise", "Actif", "36 champs", "3 méthodes"],
    ["Banque", "Institution financière", "Actif", "42 champs", "1 méthode"],
    ["Coopérative", "Organisation coopérative", "Inactif", "21 champs", "1 méthode"],
  ];

  const dictionary = [
    ["PAR30", "Portfolio", "Pourcentage", "%", "IMF", "Oui", "Actif"],
    ["ROA", "Financier", "Pourcentage", "%", "IMF", "Oui", "Actif"],
    ["DSCR", "Dette", "Pourcentage", "%", "TPME", "Oui", "Actif"],
    ["Revenu", "Performance", "Monnaie", "MAD", "TPME", "Oui", "Validation"],
  ];

  const metrics = [
    ["PAR30", "Portfolio quality", "IMF", "Net impair / portefeuille", "Actif", "5 règles"],
    ["ROA", "Rentabilité", "IMF", "Résultat net / actifs moyens", "Actif", "2 méthodes"],
    ["DSCR", "Solvabilité", "TPME", "Cash flow / dette", "Actif", "3 covenants"],
    ["EBITDA margin", "Rentabilité", "TPME", "EBITDA / revenue", "Brouillon", "1 méthode"],
  ];

  const questionnaires = [
    ["Questionnaire IMF", "IMF", "6 sections", "28 questions", "Actif"],
    ["Questionnaire PME", "TPME", "5 sections", "19 questions", "Actif"],
    ["Questionnaire banque", "Banque", "4 sections", "16 questions", "À valider"],
  ];

  const methodologies = [
    ["JAIDA IMF 2026", "IMF", "Actif", "100%", "4 dimensions"],
    ["Risk SME 2026", "TPME", "Actif", "92%", "5 dimensions"],
    ["Banque prudential 2026", "Banque", "Brouillon", "68%", "3 dimensions"],
  ];

  const financingProducts = [
    ["Prêt de trésorerie", "Crédit", "MAD", "2 M - 20 M", "Actif", "5 règles"],
    ["Financement public", "Financement", "MAD", "5 M - 50 M", "Actif", "4 garanties"],
    ["Garantie", "Garantie", "MAD", "1 M - 10 M", "Actif", "2 conditions"],
  ];

  const covenants = [
    ["PAR30 < 5%", "IMF", "Critique", "Actif", "24 clients"],
    ["DSCR > 1,2x", "TPME", "Majeur", "Actif", "18 clients"],
    ["Solvabilité > 15%", "IMF", "Moyen", "En pause", "6 clients"],
  ];

  const alerts = [
    ["PAR30 dépassé", "Alerte métier", "Majeure", "Notification + tâche", "Actif"],
    ["Soumission retardée", "Opérationnelle", "Moyenne", "Escalade 5 jours", "Actif"],
    ["Document expiré", "Contrat", "Faible", "Demande de mise à jour", "Actif"],
  ];

  const renderSection = () => {
    switch (section) {
      case "counterparties":
        return <AttributeProfileEditor />;
      /* return (
          <Panel>
            <PanelTitle
              title="Types de contreparties"
              subtitle="Configuration des profils métier et des champs applicables"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Champs</th>
                    <th className="px-4 py-3">Méthodes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {counterparties.map(([name, desc, status, fields, methods]) => (
                    <tr key={name} className="hover:bg-muted/40">
                      <td className="px-4 py-4 font-semibold">{name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{desc}</td>
                      <td className="px-4 py-4">
                        <Status tone={status === "Actif" ? "success" : "neutral"}>{status}</Status>
                      </td>
                      <td className="px-4 py-4">{fields}</td>
                      <td className="px-4 py-4">{methods}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ); */
      case "dictionary":
        return (
          <Panel>
            <PanelTitle
              title="Dictionnaire des données"
              subtitle="Registre central des champs métier et des règles de validation"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Champ</th>
                    <th className="px-4 py-3">Catégorie</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Unité</th>
                    <th className="px-4 py-3">Contrepartie</th>
                    <th className="px-4 py-3">Obligatoire</th>
                    <th className="px-4 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {dictionary.map(
                    ([field, category, type, unit, counterparty, required, status]) => (
                      <tr key={field} className="hover:bg-muted/40">
                        <td className="px-4 py-4 font-semibold">{field}</td>
                        <td className="px-4 py-4">{category}</td>
                        <td className="px-4 py-4">{type}</td>
                        <td className="px-4 py-4">{unit}</td>
                        <td className="px-4 py-4">{counterparty}</td>
                        <td className="px-4 py-4">{required}</td>
                        <td className="px-4 py-4">
                          <Status tone={status === "Actif" ? "success" : "warning"}>
                            {status}
                          </Status>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        );
      case "templates":
        return <WorkflowConfigurator />;
      /* return (
          <Panel>
            <PanelTitle
              title="Modèles de collecte"
              subtitle="Paquets de données requêtés selon le type de contrepartie et la période"
            />
            <div className="grid gap-4 p-5 md:grid-cols-2">
              {[
                ["Package trimestriel IMF", "48 champs", "12 requis", "4 documents", "Actif"],
                ["Package TPME", "36 champs", "10 requis", "2 documents", "Actif"],
                ["Package banque", "42 champs", "14 requis", "5 documents", "Brouillon"],
              ].map(([name, fields, required, docs, status]) => (
                <div key={name} className="rounded-md border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{name}</h3>
                    <Status tone={status === "Actif" ? "success" : "warning"}>{status}</Status>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>
                      <p>Champs</p>
                      <p className="mt-1 font-semibold text-foreground">{fields}</p>
                    </div>
                    <div>
                      <p>Requis</p>
                      <p className="mt-1 font-semibold text-foreground">{required}</p>
                    </div>
                    <div>
                      <p>Docs</p>
                      <p className="mt-1 font-semibold text-foreground">{docs}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        ); */
      case "metrics":
        return <MetricsWorkspace />;
      /* return (
          <Panel>
            <PanelTitle
              title="Indicateurs & ratios"
              subtitle="Bibliothèque centralisée des mesures financières et de performance"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Indicateur</th>
                    <th className="px-4 py-3">Catégorie</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Formule</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Utilisation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {metrics.map(([name, category, type, formula, status, usage]) => (
                    <tr key={name} className="hover:bg-muted/40">
                      <td className="px-4 py-4 font-semibold">{name}</td>
                      <td className="px-4 py-4">{category}</td>
                      <td className="px-4 py-4">{type}</td>
                      <td className="px-4 py-4 text-muted-foreground">{formula}</td>
                      <td className="px-4 py-4">
                        <Status tone={status === "Actif" ? "success" : "warning"}>{status}</Status>
                      </td>
                      <td className="px-4 py-4">{usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ); */
      case "questionnaires":
        return <QuestionnaireConfigurator />;
      /* return (
          <Panel>
            <PanelTitle
              title="Questionnaires"
              subtitle="Blocs de questions utilisés lors de l’évaluation et du suivi"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Questionnaire</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Sections</th>
                    <th className="px-4 py-3">Questions</th>
                    <th className="px-4 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {questionnaires.map(([name, type, sections, questions, status]) => (
                    <tr key={name} className="hover:bg-muted/40">
                      <td className="px-4 py-4 font-semibold">{name}</td>
                      <td className="px-4 py-4">{type}</td>
                      <td className="px-4 py-4">{sections}</td>
                      <td className="px-4 py-4">{questions}</td>
                      <td className="px-4 py-4">
                        <Status tone={status === "Actif" ? "success" : "warning"}>{status}</Status>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        );
      case "methodologies":
        return (
          <Panel>
            <PanelTitle
              title="Méthodologies d’évaluation"
              subtitle="Structure des dimensions, critères, règles et notation"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Méthode</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Validité</th>
                    <th className="px-4 py-3">Dimensions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {methodologies.map(([name, type, status, validity, dimensions]) => (
                    <tr key={name} className="hover:bg-muted/40">
                      <td className="px-4 py-4 font-semibold">{name}</td>
                      <td className="px-4 py-4">{type}</td>
                      <td className="px-4 py-4">
                        <Status tone={status === "Actif" ? "success" : "warning"}>{status}</Status>
                      </td>
                      <td className="px-4 py-4">{validity}</td>
                      <td className="px-4 py-4">{dimensions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        );

      case "covenants":
        return (
          <RuleBuilder
            title="Covenants & règles métier"
            subtitle="Paramétrez les seuils contractuels et leurs actions"
          />
        );
      /* return (
          <Panel>
            <PanelTitle
              title="Covenants"
              subtitle="Conditions contractuelles et seuils à surveiller pendant la relation"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Covenant</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Sévérité</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Clients</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {covenants.map(([name, type, severity, status, clients]) => (
                    <tr key={name} className="hover:bg-muted/40">
                      <td className="px-4 py-4 font-semibold">{name}</td>
                      <td className="px-4 py-4">{type}</td>
                      <td className="px-4 py-4">
                        <Status
                          tone={
                            severity === "Critique"
                              ? "danger"
                              : severity === "Majeur"
                                ? "warning"
                                : "info"
                          }
                        >
                          {severity}
                        </Status>
                      </td>
                      <td className="px-4 py-4">
                        <Status tone={status === "Actif" ? "success" : "neutral"}>{status}</Status>
                      </td>
                      <td className="px-4 py-4">{clients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ); */
      case "alerts":
        return (
          <RuleBuilder
            title="Alertes & actions"
            subtitle="Définissez les déclencheurs communs aux profils de contreparties"
          />
        );

      case "products":
        return (
          <Panel>
            <PanelTitle
              title="Produits de financement"
              subtitle="Catalogue de produits utilisables par les institutions"
            />
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase text-muted-foreground">
                    <th className="px-4 py-3">Produit</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Devise</th>
                    <th className="px-4 py-3">Plage</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Règles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {financingProducts.map(([name, type, currency, range, status, rules]) => (
                    <tr key={name} className="hover:bg-muted/40">
                      <td className="px-4 py-4 font-semibold">{name}</td>
                      <td className="px-4 py-4">{type}</td>
                      <td className="px-4 py-4">{currency}</td>
                      <td className="px-4 py-4">{range}</td>
                      <td className="px-4 py-4">
                        <Status tone={status === "Actif" ? "success" : "warning"}>{status}</Status>
                      </td>
                      <td className="px-4 py-4">{rules}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        );
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Configuration du système"
        description="Définir les référentiels, règles de monitoring et méthodologies applicables à l’institution."
        action={
          <Button>
            <Plus /> Nouveau paramètre
          </Button>
        }
      />

      <div className="mb-6 border-b border-border">
        <nav className="flex flex-wrap gap-2">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={cn(
                "rounded-t-md border-b-2 px-3 py-2 text-sm transition",
                section === item.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {renderSection()}
    </>
  );
}

function Collection() {
  return (
    <>
      <PageHeader
        eyebrow="Opérations"
        title="Collecte périodique"
        description="Contrôlez les imports automatiques et les soumissions attendues."
        action={
          <Button>
            <Upload /> Import manuel
          </Button>
        }
      />
      <div className="grid gap-3 md:grid-cols-4">
        <Metric
          label="Clients traités"
          value="124"
          detail="Dernière exécution à 06:00"
          icon={Building2}
        />
        <Metric
          label="Imports réussis"
          value="118"
          detail="95,2 % de réussite"
          icon={Check}
          tone="success"
        />
        <Metric
          label="Erreurs"
          value="4"
          detail="À corriger ou relancer"
          icon={CircleAlert}
          tone="danger"
        />
        <Metric
          label="Dossiers manquants"
          value="2"
          detail="Relance nécessaire"
          icon={Clock3}
          tone="warning"
        />
      </div>
      <Panel className="mt-5">
        <PanelTitle
          title="Historique des exécutions"
          action={
            <Button variant="outline" size="sm">
              <RefreshCw />
              Relancer
            </Button>
          }
        />
        <div className="divide-y divide-border">
          {[
            ["18 sept. 2026 · 06:00", "124", "118", "4", "2"],
            ["17 sept. 2026 · 06:00", "122", "120", "1", "1"],
            ["16 sept. 2026 · 06:00", "122", "119", "2", "1"],
          ].map((r) => (
            <div key={r[0]} className="grid grid-cols-5 gap-4 p-4 text-sm">
              <strong>{r[0]}</strong>
              <span>{r[1]} traités</span>
              <span className="text-success">{r[2]} réussis</span>
              <span className="text-destructive">{r[3]} erreurs</span>
              <span className="text-warning-foreground">{r[4]} manquants</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
function Alerts() {
  return (
    <>
      <PageHeader
        eyebrow="Risques"
        title="Alertes & covenants"
        description="Priorisez, instruisez et clôturez les événements de risque."
      />
      <div className="grid gap-3 sm:grid-cols-4">
        <Metric
          label="Critiques"
          value="2"
          detail="Action immédiate"
          icon={ShieldAlert}
          tone="danger"
        />
        <Metric
          label="Élevées"
          value="6"
          detail="À traiter sous 48 h"
          icon={AlertTriangle}
          tone="warning"
        />
        <Metric label="Moyennes" value="4" detail="Sous surveillance" icon={CircleAlert} />
        <Metric
          label="Résolues"
          value="18"
          detail="Sur les 30 derniers jours"
          icon={Check}
          tone="success"
        />
      </div>
      <Panel className="mt-5">
        <PanelTitle
          title="Alertes actives"
          action={
            <Button variant="outline" size="sm">
              <Filter />
              Filtrer
            </Button>
          }
        />
        <div className="divide-y divide-border">
          {alerts.map((a) => (
            <div key={a.label} className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-md",
                  a.tone === "danger"
                    ? "bg-danger-soft text-destructive"
                    : "bg-warning/15 text-warning-foreground",
                )}
              >
                <AlertTriangle className="size-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{a.client}</p>
                <p className="text-xs text-muted-foreground">
                  {a.label} · Détectée le {a.date}
                </p>
              </div>
              <strong className="text-sm">{a.metric}</strong>
              <Status tone={a.tone}>{a.severity}</Status>
              <Button variant="outline" size="sm">
                Examiner
              </Button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
function Comparison() {
  return (
    <>
      <PageHeader
        eyebrow="Analyse"
        title="Comparaison"
        description="Comparez uniquement les indicateurs compatibles entre périodes ou contreparties."
      />
      <Panel>
        <div className="grid gap-3 border-b border-border p-4 md:grid-cols-3">
          <Button variant="outline" className="justify-between">
            Clients multiples <ChevronDown />
          </Button>
          <Button variant="outline" className="justify-between">
            T2 2026 <ChevronDown />
          </Button>
          <Button variant="outline" className="justify-between">
            Indicateurs financiers <ChevronDown />
          </Button>
        </div>
        <PanelTitle
          title="Comparaison des pairs"
          subtitle="Institutions de microfinance · T2 2026"
        />
        <div className="overflow-x-auto p-5">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th className="py-3">Indicateur</th>
                <th>Atlas Microfinance</th>
                <th>Amana Finance</th>
                <th>Al Baraka Microcrédit</th>
                <th>Moyenne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["PAR30", "5,8 %", "3,9 %", "4,4 %", "4,7 %"],
                ["ROA", "4,2 %", "3,1 %", "4,8 %", "3,9 %"],
                ["Solvabilité", "18,5 %", "20,1 %", "16,7 %", "18,4 %"],
                ["Croissance", "12,4 %", "8,7 %", "10,1 %", "10,4 %"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="py-4 font-semibold">{r[0]}</td>
                  {r.slice(1).map((x, i) => (
                    <td
                      key={i}
                      className={cn(i === 0 && r[0] === "PAR30" && "font-bold text-destructive")}
                    >
                      {x}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
function Reports() {
  return (
    <>
      <PageHeader
        eyebrow="Reporting"
        title="Rapports & benchmarking"
        description="Générez vos livrables à partir des modèles validés."
        action={
          <Button>
            <Plus />
            Générer un rapport
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          [
            "Rapport de due diligence",
            "Atlas Microfinance · DD-2026-084",
            "Mis à jour aujourd’hui",
          ],
          ["Analyse financière", "Portefeuille IMF · T2 2026", "Généré le 17 sept."],
          ["Rapport de suivi", "Portefeuille consolidé · Août 2026", "Généré le 12 sept."],
          ["Évaluation des risques", "Nova Industrie · DD-2026-081", "Généré le 10 sept."],
          ["Benchmark sectoriel", "TPME industrielles · T2 2026", "Généré le 8 sept."],
          ["Rapport comité de crédit", "Session du 22 septembre", "Brouillon"],
        ].map(([a, b, c]) => (
          <Panel key={a} className="p-5">
            <div className="flex justify-between">
              <span className="flex size-9 items-center justify-center rounded-md bg-info-soft text-primary">
                <FileBarChart className="size-4" />
              </span>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </div>
            <h3 className="mt-5 text-sm font-semibold">{a}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{b}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-[11px] text-muted-foreground">{c}</span>
              <Button variant="ghost" size="sm">
                <Download />
                PDF
              </Button>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}

export function FinancialWorkspace() {
  const [view, setView] = useState<View>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (v: View) => {
    setView(v);
    setMobileOpen(false);
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all",
          collapsed ? "w-[68px]" : "w-60",
          mobileOpen ? "translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sidebar-primary font-bold text-primary-foreground">
            F
          </span>
          {!collapsed && (
            <div>
              <p className="text-sm font-bold text-sidebar-accent-foreground">FinScope</p>
              <p className="text-[10px] text-sidebar-foreground/65">ANALYSE & RISQUES</p>
            </div>
          )}
          <button
            className="ml-auto lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {nav.map((group, g) => (
            <div key={g} className="mb-4">
              {group.group && !collapsed && (
                <p className="mb-1 px-3 text-[10px] font-bold text-sidebar-foreground/45">
                  {group.group}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item, i) => (
                  <button
                    key={`${item.label}-${i}`}
                    title={item.label}
                    onClick={() => go(item.id)}
                    className={cn(
                      "flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm transition",
                      view === item.id
                        ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {item.id === "alertes" && !collapsed && (
                      <span className="ml-auto rounded bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                        12
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center gap-3 rounded-md px-3 py-2 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent lg:flex"
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <>
                <PanelLeftClose className="size-4" />
                Réduire
              </>
            )}
          </button>
        </div>
      </aside>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer"
        />
      )}
      <div className={cn("transition-all", collapsed ? "lg:pl-[68px]" : "lg:pl-60")}>
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-card/95 px-4 backdrop-blur md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </Button>
          <div className="relative hidden w-full max-w-md md:block">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              className="border-transparent bg-muted pl-9 shadow-none"
              placeholder="Rechercher un client, un dossier, un indicateur…"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Aide">
              <HelpCircle />
            </Button>
            <Button variant="ghost" size="icon" className="relative" title="Notifications">
              <Bell />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
            </Button>
            <div className="mx-1 h-6 w-px bg-border" />
            <button className="hidden items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted sm:flex">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                SE
              </span>
              <span className="text-left">
                <span className="block text-xs font-semibold">Mr. Amine Caciopee</span>
                <span className="block text-[10px] text-muted-foreground">Analyste risques</span>
              </span>
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 md:p-6 lg:p-8">
          {view === "dashboard" ? (
            <Dashboard go={go} />
          ) : view === "dossiers" ? (
            <Dossiers open={() => go("dossier")} />
          ) : view === "dossier" ? (
            <Dossier back={() => go("dossiers")} />
          ) : view === "portfolio" ? (
            <Portfolio open={() => go("client")} />
          ) : view === "client" ? (
            <ClientWorkspace back={() => go("portfolio")} />
          ) : view === "collecte" ? (
            <Collection />
          ) : view === "alertes" ? (
            <Alerts />
          ) : view === "comparaison" ? (
            <Comparison />
          ) : view === "rapports" ? (
            <Reports />
          ) : (
            <ConfigurationWorkspace />
          )}
        </main>
      </div>
    </div>
  );
}
