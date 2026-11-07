"use client";

import type { ReactNode } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToHash from "../components/ScrollToView";
import ScrollProgress from "../components/ui/ScrollProgress";

export default function ClientShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <ScrollToHash />
      <ScrollProgress />
      {children}
    </ErrorBoundary>
  );
}
