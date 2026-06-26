import { useState } from 'react'
import { MapPin, Calendar, Trophy } from 'lucide-react'
import type { Bracket, BracketMatch, BracketTeam, RoundId } from '../types'
import { isPlayed, isRoundDecided } from '../lib/bracket'

function formatDate(iso?: string): string | null {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function Side({
  team,
  score,
  played,
  winner,
}: {
  team?: BracketTeam
  score?: number
  played: boolean
  winner: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 ${
        winner ? 'text-slate-50' : 'text-slate-300'
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="text-base leading-none" aria-hidden>
          {team?.flag ?? '⚪'}
        </span>
        <span className={`truncate ${winner ? 'font-bold' : 'font-medium'}`}>
          {team ? team.code : 'TBD'}
        </span>
      </span>
      {played && (
        <span className={`nums tabular-nums ${winner ? 'font-bold text-accent' : ''}`}>
          {score}
        </span>
      )}
    </div>
  )
}

function MatchCard({ match, isFinal }: { match: BracketMatch; isFinal: boolean }) {
  const played = isPlayed(match)
  const homeWon = played && (match.homeScore ?? 0) > (match.awayScore ?? 0)
  const awayWon = played && (match.awayScore ?? 0) > (match.homeScore ?? 0)
  const date = formatDate(match.date)

  return (
    <div
      className={`rounded-xl border bg-slate-900/50 p-3 ${
        isFinal
          ? 'border-amber-400/50 ring-1 ring-amber-400/30'
          : 'border-slate-800'
      }`}
    >
      {isFinal && (
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
          <Trophy className="h-3.5 w-3.5" aria-hidden /> Final
        </div>
      )}
      <div className="space-y-1.5">
        <Side team={match.home} score={match.homeScore} played={played} winner={homeWon} />
        <div className="h-px bg-slate-800" />
        <Side team={match.away} score={match.awayScore} played={played} winner={awayWon} />
      </div>
      {(date || match.venue) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          {date && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden /> {date}
            </span>
          )}
          {match.venue && (
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">{match.venue}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default function BracketView({ bracket }: { bracket: Bracket }) {
  const [active, setActive] = useState<RoundId>(bracket.rounds[0]?.id ?? 'R32')
  const round =
    bracket.rounds.find((r) => r.id === active) ?? bracket.rounds[0]

  return (
    <section aria-label="Knockout bracket">
      {/* Round chips — page through one round at a time on a phone. */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {bracket.rounds.map((r) => {
          const selected = r.id === active
          const decided = isRoundDecided(r)
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(r.id)}
              aria-pressed={selected}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                selected
                  ? 'bg-accent text-slate-950'
                  : decided
                    ? 'bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-900/60 text-slate-500 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    decided
                      ? 'bg-emerald-400'
                      : selected
                        ? 'bg-slate-900'
                        : 'bg-slate-600'
                  }`}
                  aria-hidden
                />
                {r.id === 'final' ? 'Final' : r.id}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-3">
        <h2 className="mb-2 text-sm font-semibold text-slate-300">{round.label}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {round.matches.map((m) => (
            <MatchCard key={m.id} match={m} isFinal={round.id === 'final'} />
          ))}
        </div>
      </div>

      {bracket.note && (
        <p className="mt-4 text-[11px] leading-relaxed text-slate-500">{bracket.note}</p>
      )}
    </section>
  )
}
