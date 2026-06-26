"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, registerAction } from "@/features/auth/actions";
import { initialAuthActionState } from "@/features/auth/state";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, isPending] = useActionState(
    action,
    initialAuthActionState,
  );

  return (
    <form className="auth-form" action={formAction}>
      {mode === "register" ? (
        <label>
          Nom
          <input name="name" type="text" autoComplete="name" required />
        </label>
      ) : null}

      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <label>
        Mot de passe
        <input
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          minLength={mode === "login" ? undefined : 8}
          required
        />
      </label>

      {state.status === "error" ? (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      ) : null}

      <button className="primary-button" type="submit" disabled={isPending}>
        {isPending
          ? "Traitement..."
          : mode === "login"
            ? "Se connecter"
            : "Créer le compte"}
      </button>

      <p className="auth-switch">
        {mode === "login" ? (
          <>
            Pas encore de compte ? <Link href="/register">Créer un compte</Link>
          </>
        ) : (
          <>
            Déjà inscrit ? <Link href="/login">Se connecter</Link>
          </>
        )}
      </p>
    </form>
  );
}
