"use client";

import { useReportWebVitals } from "next/web-vitals";

const metricLabels: Record<string, string> = {
  CLS: "stabilité visuelle",
  FCP: "premier rendu",
  FID: "première interaction",
  INP: "latence interaction",
  LCP: "contenu principal",
  TTFB: "réponse serveur",
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    const label = metricLabels[metric.name] ?? metric.name;

    console.info("[web-vitals]", {
      id: metric.id,
      nom: metric.name,
      libelle: label,
      valeur: metric.value,
      note: metric.rating,
      navigation: metric.navigationType,
    });
  });

  return null;
}
