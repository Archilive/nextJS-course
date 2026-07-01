"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.info("[pwa] service worker enregistré", registration.scope);
      })
      .catch((error: unknown) => {
        console.warn("[pwa] service worker indisponible", error);
      });
  }, []);

  return null;
}
