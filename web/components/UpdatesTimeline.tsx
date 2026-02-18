import { useState } from "react";
import type { ClientUpdate } from "../api";
import { BOARD_DISPLAY_NAMES } from "../../lib/query/types";

function formatDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

function groupByDate(updates: ClientUpdate[]): Record<string, ClientUpdate[]> {
  const groups: Record<string, ClientUpdate[]> = {};
  for (const u of updates) {
    const key = new Date(u.createdAtSource).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    (groups[key] ??= []).push(u);
  }
  return groups;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

// Deterministic color from name
const AVATAR_COLORS = [
  { bg: "#1e293b", text: "#e2e8f0" },
  { bg: "#7c3aed", text: "#ede9fe" },
  { bg: "#0369a1", text: "#e0f2fe" },
  { bg: "#b45309", text: "#fef3c7" },
  { bg: "#059669", text: "#ecfdf5" },
  { bg: "#be185d", text: "#fce7f3" },
  { bg: "#4338ca", text: "#e0e7ff" },
  { bg: "#dc2626", text: "#fef2f2" },
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]!;
}

interface Props {
  updates: ClientUpdate[];
}

export function UpdatesTimeline({ updates }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (updates.length === 0) return null;

  const grouped = groupByDate(updates);
  const dateKeys = Object.keys(grouped);
  const visibleKeys = showAll ? dateKeys : dateKeys.slice(0, 5);
  const hasMore = dateKeys.length > 5;

  return (
    <div className="card card-elevated overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-5 py-3 transition-colors"
        style={{
          backgroundColor: "var(--color-surface-warm)",
          borderBottom: collapsed ? "none" : "1px solid var(--color-border-light)",
        }}
      >
        <div className="flex items-center gap-3">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="var(--color-ink-faint)"
            className={`toggle-chevron ${!collapsed ? "toggle-chevron-open" : ""}`}
          >
            <path d="M4.5 2l4 4-4 4" />
          </svg>
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
          >
            Updates & Notes
          </h3>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink-faint)",
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--color-border-light)",
            }}
          >
            {updates.length}
          </span>
        </div>
        <span
          className="text-xs"
          style={{ color: "var(--color-ink-faint)", fontFamily: "var(--font-body)" }}
        >
          {collapsed ? "Show" : "Hide"}
        </span>
      </button>

      {!collapsed && (
        <div className="px-5 py-4">
          {visibleKeys.map((date, di) => (
            <div key={date} className="mb-5 last:mb-0">
              {/* Date header */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-amber)", fontFamily: "var(--font-body)" }}
                >
                  {date}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border-light)" }} />
              </div>

              {/* Updates for this date */}
              <div className="space-y-3">
                {grouped[date]!.map((u) => {
                  const { time } = formatDateTime(u.createdAtSource);
                  const initials = getInitials(u.authorName);
                  const avatarColor = getAvatarColor(u.authorName);
                  const isReply = u.sourceType === "reply";

                  return (
                    <div
                      key={u.localId}
                      className="flex gap-3"
                      style={{ paddingLeft: isReply ? 36 : 0 }}
                    >
                      {/* Avatar */}
                      <div
                        className="author-avatar"
                        style={{
                          backgroundColor: isReply ? "transparent" : avatarColor.bg,
                          color: isReply ? "var(--color-ink-faint)" : avatarColor.text,
                          border: isReply ? "1.5px solid var(--color-border)" : "none",
                          fontSize: isReply ? 10 : 11,
                          width: isReply ? 24 : 28,
                          height: isReply ? 24 : 28,
                          marginTop: 2,
                        }}
                      >
                        {initials}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-1">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
                          >
                            {u.authorName}
                          </span>
                          <span
                            className="text-[11px]"
                            style={{ color: "var(--color-ink-faint)", fontFamily: "var(--font-mono)" }}
                          >
                            {time}
                          </span>
                          {u.boardKey && (
                            <span className="board-tag">
                              {BOARD_DISPLAY_NAMES[u.boardKey] ?? u.boardKey}
                            </span>
                          )}
                          {isReply && (
                            <span
                              className="text-[11px] font-medium px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: "var(--color-status-purple-bg)",
                                color: "var(--color-status-purple)",
                              }}
                            >
                              reply
                            </span>
                          )}
                        </div>
                        <p
                          className="text-sm whitespace-pre-wrap leading-relaxed"
                          style={{
                            color: "var(--color-ink-muted)",
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                          }}
                        >
                          {u.textBody}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Show more / show less */}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3 text-sm font-medium transition-colors"
              style={{ color: "var(--color-amber)", fontFamily: "var(--font-body)" }}
            >
              {showAll ? "Show less" : `Show all ${dateKeys.length} dates...`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
