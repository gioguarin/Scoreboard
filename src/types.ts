// Typed data contracts for the app. Keeping these in one place means a future
// live API only has to return these shapes — components never change.

export interface Team {
  /** 3-letter country code, e.g. "NED". */
  code: string
  /** Full country name, shown on wider layouts. */
  name: string
  /** Flag emoji. */
  flag: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  /** Derived from W/D/L (3·W + D); never stored independently. */
  points: number
}

export interface Group {
  /** Group letter, A–L. */
  id: string
  teams: Team[]
}

export interface Standings {
  tournament: string
  /** Human-readable current stage, e.g. "Round of 16". */
  stage: string
  /** ISO date the data is current as of. */
  asOf: string
  /** True when the data is illustrative rather than an official feed. */
  sample: boolean
  groups: Group[]
}

export interface BracketTeam {
  name: string
  code: string
  flag: string
}

export interface BracketMatch {
  /** Globally unique across the whole bracket (guards React keys). */
  id: string
  home?: BracketTeam
  away?: BracketTeam
  homeScore?: number
  awayScore?: number
  /** ISO date of the fixture. */
  date?: string
  venue?: string
}

export type RoundId = 'R32' | 'R16' | 'QF' | 'SF' | 'final'

export interface BracketRound {
  id: RoundId
  label: string
  matches: BracketMatch[]
}

export interface Bracket {
  tournament: string
  asOf: string
  sample: boolean
  note?: string
  rounds: BracketRound[]
}
