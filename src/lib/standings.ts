import type { Team } from '../types'

/** A team's results without the derived fields. */
export type TeamResult = Omit<Team, 'points' | 'played'>

/** Goal difference: goals scored minus conceded. */
export function goalDiff(team: Pick<Team, 'goalsFor' | 'goalsAgainst'>): number {
  return team.goalsFor - team.goalsAgainst
}

/**
 * Construct a full Team row, deriving `played` and `points` from the W/D/L
 * record (3 per win, 1 per draw). Because points are computed here, a row's
 * total can never drift out of sync with its results.
 */
export function withPoints(result: TeamResult): Team {
  const played = result.won + result.drawn + result.lost
  const points = result.won * 3 + result.drawn
  return { ...result, played, points }
}

/**
 * Pure, non-mutating sort by the tournament tiebreak order:
 * points → goal difference → goals scored → name (A→Z).
 */
export function rankTeams(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const gd = goalDiff(b) - goalDiff(a)
    if (gd !== 0) return gd
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
    return a.name.localeCompare(b.name)
  })
}
