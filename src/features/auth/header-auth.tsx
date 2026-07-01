import Link from "next/link";
import { getInitials } from "@/features/auth/password";
import { logoutAction } from "@/features/auth/actions";
import { LanguageSwitcher } from "@/features/i18n/language-switcher";
import { getDictionary, getRequestLocale } from "@/features/i18n/server";
import { auth } from "@/lib/auth";

export async function HeaderAuth() {
  const session = await auth();
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <>
      <nav className="main-nav" aria-label="Navigation principale">
        <Link href="/">{dictionary.nav.products}</Link>
        <Link href="/performance">{dictionary.nav.performance}</Link>
        <Link href="/production">{dictionary.nav.production}</Link>
        <Link href="/compte">{dictionary.nav.account}</Link>
        {session?.user.role === "ADMIN" ? (
          <Link href="/admin/products">{dictionary.nav.admin}</Link>
        ) : null}
      </nav>

      {session?.user ? (
        <div className="auth-controls">
          <LanguageSwitcher labels={dictionary.language} locale={locale} />
          <span className="user-badge" title={session.user.name ?? "Compte"}>
            {getInitials(session.user.name ?? session.user.email ?? "U")}
          </span>
          <form action={logoutAction}>
            <button className="secondary-button compact" type="submit">
              {dictionary.nav.logout}
            </button>
          </form>
        </div>
      ) : (
        <div className="auth-controls">
          <LanguageSwitcher labels={dictionary.language} locale={locale} />
          <Link className="secondary-link" href="/login">
            {dictionary.nav.login}
          </Link>
          <Link className="secondary-link strong" href="/register">
            {dictionary.nav.register}
          </Link>
        </div>
      )}
    </>
  );
}
