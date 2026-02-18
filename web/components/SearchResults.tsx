import type { SearchResult } from "../api";

interface Props {
  results: SearchResult[];
  onSelect: (localId: string) => void;
}

export function SearchResults({ results, onSelect }: Props) {
  if (results.length === 0) return null;

  return (
    <div className="card card-elevated overflow-hidden animate-in">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            <th
              className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-ink-faint)", fontFamily: "var(--font-body)" }}
            >
              Name
            </th>
            <th
              className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-ink-faint)", fontFamily: "var(--font-body)" }}
            >
              Email
            </th>
            <th
              className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-ink-faint)", fontFamily: "var(--font-body)" }}
            >
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr
              key={r.localId}
              onClick={() => onSelect(r.localId)}
              className="result-row"
              style={{
                borderBottom: i < results.length - 1 ? "1px solid var(--color-border-light)" : "none",
                animation: `fadeIn 0.3s ease-out ${i * 0.03}s both`,
              }}
            >
              <td
                className="px-5 py-3 font-medium text-sm"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
              >
                {r.name}
              </td>
              <td
                className="px-5 py-3 text-sm"
                style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-body)" }}
              >
                {r.email ?? <span style={{ color: "var(--color-ink-faint)" }}>&mdash;</span>}
              </td>
              <td
                className="px-5 py-3 text-sm"
                style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}
              >
                {r.phone ?? <span style={{ color: "var(--color-ink-faint)" }}>&mdash;</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
