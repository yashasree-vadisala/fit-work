import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-ink-900 text-paper hover:bg-ink-700 dark:bg-gold dark:text-ink-900 dark:hover:bg-gold-light",
  outline:
    "border border-ink-200 text-ink-900 hover:border-gold hover:text-gold dark:border-ink-600 dark:text-paper",
  ghost: "text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-paper",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  icon: Icon,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </button>
  );
}
