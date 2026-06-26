"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export type PrefetchMode = "auto" | "hover";

type PrefetchLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

export function PrefetchLink({ children, className, href }: PrefetchLinkProps) {
  const router = useRouter();

  function prefetchOnIntent() {
    router.prefetch(href);
  }

  return (
    <Link
      className={className}
      href={href}
      prefetch={false}
      onFocus={prefetchOnIntent}
      onMouseEnter={prefetchOnIntent}
    >
      {children}
    </Link>
  );
}
