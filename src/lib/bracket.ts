import type { BracketMatch, BracketRound } from '../types'

/**
 * A match counts as played only once both scores are present. Upcoming and TBD
 * fixtures therefore never render a score.
 */
export function isPlayed(match: BracketMatch): boolean {
  return match.homeScore !== undefined && match.awayScore !== undefined
}

/** A round is "decided" when every one of its matches has been played. */
export function isRoundDecided(round: BracketRound): boolean {
  return round.matches.length > 0 && round.matches.every(isPlayed)
}
