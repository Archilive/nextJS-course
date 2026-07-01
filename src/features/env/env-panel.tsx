"use client";

import { useEffect, useState } from "react";

type ServerEnvPayload = {
  publicSiteName: string;
  serverOnly: {
    databaseConfigured: boolean;
    authSecretConfigured: boolean;
  };
};

export function EnvPanel() {
  const [serverEnv, setServerEnv] = useState<ServerEnvPayload | null>(null);

  useEffect(() => {
    let ignore = false;

    fetch("/api/env")
      .then((response) => response.json() as Promise<ServerEnvPayload>)
      .then((payload) => {
        if (!ignore) {
          setServerEnv(payload);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="metric-grid">
      <article className="metric-card">
        <p className="eyebrow">Client</p>
        <h2>Variable publique</h2>
        <strong>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Non définie"}</strong>
        <p className="muted-text">
          Seules les variables préfixées par NEXT_PUBLIC sont disponibles ici.
        </p>
      </article>

      <article className="metric-card">
        <p className="eyebrow">Serveur</p>
        <h2>Variables privées</h2>
        <dl className="metric-list">
          <div>
            <dt>DATABASE_URL</dt>
            <dd>{serverEnv?.serverOnly.databaseConfigured ? "Configurée" : "Masquée"}</dd>
          </div>
          <div>
            <dt>AUTH_SECRET</dt>
            <dd>{serverEnv?.serverOnly.authSecretConfigured ? "Configurée" : "Masquée"}</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
