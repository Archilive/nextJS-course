import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { auth } from "@/lib/auth";

export default function AccountPage() {
  return (
    <div className="page-shell">
      <Suspense fallback={<AccountFallback />}>
        <AccountContent />
      </Suspense>
    </div>
  );
}

async function AccountContent() {
  await connection();

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="feedback-panel account-panel">
      <p className="eyebrow">Page protégée</p>
      <h1>Bonjour {session.user.name}</h1>
      <dl className="account-list">
        <div>
          <dt>Email</dt>
          <dd>{session.user.email}</dd>
        </div>
        <div>
          <dt>Rôle</dt>
          <dd>{session.user.role}</dd>
        </div>
      </dl>
    </section>
  );
}

function AccountFallback() {
  return (
    <div className="loader-panel" role="status">
      <span className="loader" />
      <p>Chargement du compte...</p>
    </div>
  );
}
