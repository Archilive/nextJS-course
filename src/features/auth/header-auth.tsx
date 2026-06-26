import Link from "next/link";
import { getInitials } from "@/features/auth/password";
import { logoutAction } from "@/features/auth/actions";
import { auth } from "@/lib/auth";

export async function HeaderAuth() {
  const session = await auth();

  return (
    <>
      <nav className="main-nav" aria-label="Navigation principale">
        <Link href="/">Produits</Link>
        <Link href="/performance">Performance</Link>
        <Link href="/compte">Compte</Link>
        {session?.user.role === "ADMIN" ? (
          <Link href="/admin/products">Admin</Link>
        ) : null}
      </nav>

      {session?.user ? (
        <div className="auth-controls">
          <span className="user-badge" title={session.user.name ?? "Compte"}>
            {getInitials(session.user.name ?? session.user.email ?? "U")}
          </span>
          <form action={logoutAction}>
            <button className="secondary-button compact" type="submit">
              Déconnexion
            </button>
          </form>
        </div>
      ) : (
        <div className="auth-controls">
          <Link className="secondary-link" href="/login">
            Connexion
          </Link>
          <Link className="secondary-link strong" href="/register">
            Inscription
          </Link>
        </div>
      )}
    </>
  );
}
