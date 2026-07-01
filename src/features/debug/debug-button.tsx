"use client";

import { useState } from "react";

export function DebugButton() {
  const [message, setMessage] = useState("Point d'arrêt prêt.");

  function handleDebugClick() {
    const contexte = {
      page: "production",
      date: new Date().toISOString(),
      site: process.env.NEXT_PUBLIC_SITE_NAME,
    };

    debugger;
    setMessage(`Point d'arrêt déclenché pour ${contexte.site}.`);
  }

  return (
    <div className="debug-panel">
      <button className="secondary-button" onClick={handleDebugClick} type="button">
        Déclencher le point d&apos;arrêt front
      </button>
      <p className="muted-text">{message}</p>
    </div>
  );
}
