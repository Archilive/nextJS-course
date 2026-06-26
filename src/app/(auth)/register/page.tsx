import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AuthForm } from "@/features/auth/auth-form";
import { auth } from "@/lib/auth";

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthPageFallback label="Inscription" />}>
      <RegisterContent />
    </Suspense>
  );
}

async function RegisterContent() {
  await connection();

  const session = await auth();

  if (session?.user) {
    redirect("/compte");
  }

  return (
    <main className="page-shell auth-page">
      <Link className="back-link" href="/">
        Retour à la boutique
      </Link>

      <section className="auth-panel" aria-labelledby="register-title">
        <p className="eyebrow">Inscription</p>
        <h1 id="register-title">Créer un compte</h1>
        <AuthForm mode="register" />
      </section>
    </main>
  );
}

function AuthPageFallback({ label }: { label: string }) {
  return (
    <main className="page-shell auth-page">
      <section className="auth-panel">
        <p className="eyebrow">{label}</p>
        <div className="loader-panel inline-loader" role="status">
          <span className="loader" />
          <p>Chargement...</p>
        </div>
      </section>
    </main>
  );
}
