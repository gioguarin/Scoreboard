import { useState } from 'react'
import type { Standings } from '../types'
import GroupTable from './GroupTable'

function Legend() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-1 rounded-sm bg-emerald-400" /> Advance (top 2)
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-1 rounded-sm bg-amber-400" /> Best-third playoff
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-1 rounded-sm bg-slate-700" /> Eliminated
      </span>
    </div>
  )
}

export default function StandingsView({ standings }: { standings: Standings }) {
  const [active, setActive] = useState(standings.groups[0]?.id ?? 'A')
  const group =
    standings.groups.find((g) => g.id === active) ?? standings.groups[0]

  return (
    <section aria-label="Group standings">
      {/* Horizontally scrollable group tabs — never wrap. */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {standings.groups.map((g) => {
          const selected = g.id === active
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              aria-pressed={selected}
              className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? 'bg-accent text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {g.id}
            </button>
          )
        })}
      </div>

      <div className="mt-3">
        <h2 className="mb-2 text-sm font-semibold text-slate-300">
          Group {group.id}
        </h2>
        <GroupTable group={group} />
        <Legend />
      </div>
    </section>
  )
}
