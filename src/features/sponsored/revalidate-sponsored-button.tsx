"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function RevalidateSponsoredButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function refreshSponsoredProducts() {
    startTransition(async () => {
      await fetch("/api/revalidate-sponsored", {
        method: "POST",
      });
      router.refresh();
    });
  }

  return (
    <button
      className="secondary-button"
      type="button"
      onClick={refreshSponsoredProducts}
      disabled={isPending}
    >
      {isPending ? "Actualisation..." : "Actualiser"}
    </button>
  );
}
