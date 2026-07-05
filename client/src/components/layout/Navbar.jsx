import { NavLink } from "react-router-dom";
import { ScanLine } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { to: "/analyze", label: "Match Score" },
  { to: "/correct", label: "Correction" },
  { to: "/generate", label: "ATS Generator" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-paper/80 backdrop-blur-md dark:border-ink-700/80 dark:bg-ink-900/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-ink-900 text-gold dark:bg-gold dark:text-ink-900">
            <ScanLine size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Fitwork</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-ink-900 text-paper dark:bg-gold dark:text-ink-900"
                    : "text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/analyze"
            className="hidden rounded-full bg-gold px-4 py-2 font-body text-sm font-semibold text-ink-900 transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Check my score
          </NavLink>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-ink-100/80 px-4 py-2 dark:border-ink-700/80 md:hidden">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-3 py-1.5 font-body text-sm font-medium ${
                isActive
                  ? "bg-ink-900 text-paper dark:bg-gold dark:text-ink-900"
                  : "text-ink-500 dark:text-ink-300"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
