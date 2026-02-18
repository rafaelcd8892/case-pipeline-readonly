import type { ClientCaseSummary } from "../api";
import { BOARD_CONFIG, SECTIONS, SECTION_LABELS } from "../config";
import { ProfileCard } from "./ProfileCard";
import { ContractsSection } from "./ContractsSection";
import { BoardSection } from "./BoardSection";
import { AppointmentSection } from "./AppointmentSection";
import { UpdatesTimeline } from "./UpdatesTimeline";

interface Props {
  data: ClientCaseSummary;
}

export function ClientView({ data }: Props) {
  let delay = 2; // start after profile (0) and contracts (1)

  return (
    <div className="space-y-4">
      <ProfileCard profile={data.profile} />
      <ContractsSection contracts={data.contracts} />

      {SECTIONS.map((section) => {
        const boards = BOARD_CONFIG.filter((b) => b.section === section);
        const hasItems = boards.some((b) => (data.boardItems[b.key]?.length ?? 0) > 0);
        if (!hasItems) return null;

        const sectionDelay = delay++;

        return (
          <div
            key={section}
            className={`animate-in animate-in-delay-${Math.min(sectionDelay, 5)}`}
          >
            <div className="section-divider">
              <span
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-ink-faint)", fontFamily: "var(--font-body)" }}
              >
                {SECTION_LABELS[section]}
              </span>
            </div>
            {boards.map((board) => {
              const items = data.boardItems[board.key];
              if (!items || items.length === 0) return null;
              return <BoardSection key={board.key} label={board.label} items={items} />;
            })}
          </div>
        );
      })}

      <div className={`animate-in animate-in-delay-${Math.min(delay, 5)}`}>
        <AppointmentSection appointments={data.appointments} />
      </div>

      <div className={`animate-in animate-in-delay-${Math.min(delay + 1, 5)}`}>
        <UpdatesTimeline updates={data.updates} />
      </div>
    </div>
  );
}
