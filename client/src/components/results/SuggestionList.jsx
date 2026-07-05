export default function SuggestionList({ title, items = [], icon: Icon, tone = "text-ink-900 dark:text-paper" }) {
  if (!items.length) return null;

  return (
    <div>
      <div className={`mb-3 flex items-center gap-2 ${tone}`}>
        {Icon && <Icon size={16} />}
        <h3 className="font-body text-sm font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 rounded-lg border border-ink-100 bg-white/50 px-4 py-3 font-body text-sm text-ink-600 dark:border-ink-700 dark:bg-ink-800/50 dark:text-ink-300"
          >
            <span className="font-mono text-xs text-ink-300 dark:text-ink-500">{String(i + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
