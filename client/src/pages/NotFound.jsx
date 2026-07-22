import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell.jsx";

export default function NotFound() {
  return (
    
    <PageShell className="flex flex-col items-center justify-center text-center">
      <p className="font-mono text-6xl font-semibold text-ink-200 dark:text-ink-700">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900 dark:text-paper">
        This page doesn't exist.
      </h1>
      <Link
        to="/"
        className="mt-6 rounded-full bg-ink-900 px-6 py-3 font-body text-sm font-semibold text-paper dark:bg-gold dark:text-ink-900"
      >
        Back to home
      </Link>
    </PageShell>
  );
}
