import type { Group } from '../types'
import { goalDiff, rankTeams } from '../lib/standings'

/**
 * Left-border color encodes qualification: top 2 advance (green), 3rd is the
 * best-third playoff spot (amber), the rest neutral.
 */
function qualClass(position: number): string {
  if (position <= 2) return 'border-l-emerald-400'
  if (position === 3) return 'border-l-amber-400'
  return 'border-l-slate-700'
}

export default function GroupTable({ group }: { group: Group }) {
  const ranked = rankTeams(group.teams)

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
      <table className="w-full min-w-[20rem] border-collapse text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-slate-500">
            <th className="py-2 pl-3 pr-1 text-left font-medium">#</th>
            <th className="py-2 px-1 text-left font-medium">Team</th>
            <th className="py-2 px-2 text-right font-medium">P</th>
            <th className="hidden py-2 px-2 text-right font-medium sm:table-cell">W</th>
            <th className="hidden py-2 px-2 text-right font-medium sm:table-cell">D</th>
            <th className="hidden py-2 px-2 text-right font-medium sm:table-cell">L</th>
            <th className="hidden py-2 px-2 text-right font-medium md:table-cell">GF</th>
            <th className="hidden py-2 px-2 text-right font-medium md:table-cell">GA</th>
            <th className="py-2 px-2 text-right font-medium">GD</th>
            <th className="py-2 pl-2 pr-3 text-right font-medium">Pts</th>
          </tr>
        </thead>
        <tbody className="nums">
          {ranked.map((team, i) => {
            const position = i + 1
            const gd = goalDiff(team)
            return (
              <tr
                key={team.code}
                className={`border-l-4 border-t border-slate-800/80 ${qualClass(position)}`}
              >
                <td className="py-2.5 pl-3 pr-1 text-left text-slate-400">{position}</td>
                <td className="py-2.5 px-1 text-left">
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none" aria-hidden>
                      {team.flag}
                    </span>
                    <span className="font-semibold sm:hidden">{team.code}</span>
                    <span className="hidden font-medium sm:inline">{team.name}</span>
                  </span>
                </td>
                <td className="py-2.5 px-2 text-right text-slate-300">{team.played}</td>
                <td className="hidden py-2.5 px-2 text-right text-slate-300 sm:table-cell">
                  {team.won}
                </td>
                <td className="hidden py-2.5 px-2 text-right text-slate-300 sm:table-cell">
                  {team.drawn}
                </td>
                <td className="hidden py-2.5 px-2 text-right text-slate-300 sm:table-cell">
                  {team.lost}
                </td>
                <td className="hidden py-2.5 px-2 text-right text-slate-300 md:table-cell">
                  {team.goalsFor}
                </td>
                <td className="hidden py-2.5 px-2 text-right text-slate-300 md:table-cell">
                  {team.goalsAgainst}
                </td>
                <td className="py-2.5 px-2 text-right text-slate-300">
                  {gd > 0 ? `+${gd}` : gd}
                </td>
                <td className="py-2.5 pl-2 pr-3 text-right font-bold text-accent">
                  {team.points}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
