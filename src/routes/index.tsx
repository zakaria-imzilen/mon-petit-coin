import { createFileRoute } from "@tanstack/react-router";
import { FinancialWorkspace } from "@/components/financial-workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinScope — Pilotage financier et risques" },
      {
        name: "description",
        content: "Espace opérationnel d'analyse, de décision et de suivi des contreparties.",
      },
      { property: "og:title", content: "FinScope — Pilotage financier et risques" },
      {
        property: "og:description",
        content: "Espace opérationnel d'analyse, de décision et de suivi des contreparties.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinancialWorkspace,
});