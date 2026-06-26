import type { Bracket, BracketMatch, BracketTeam } from '../types'

// ---------------------------------------------------------------------------
// SAMPLE DATA — illustrative only, not an official feed.
//
// Swap `bracket` for a fetch returning the `Bracket` shape (src/types.ts) to go
// live. The Round of 32 is shown as played (with scores); later rounds are
// upcoming (winners seeded, no scores) down to TBD slots — exercising every
// rendering state: decided round, upcoming fixture, and TBD.
// ---------------------------------------------------------------------------

const T: Record<string, BracketTeam> = {
  NED: { name: 'Netherlands', code: 'NED', flag: '🇳🇱' },
  USA: { name: 'United States', code: 'USA', flag: '🇺🇸' },
  ARG: { name: 'Argentina', code: 'ARG', flag: '🇦🇷' },
  AUS: { name: 'Australia', code: 'AUS', flag: '🇦🇺' },
  FRA: { name: 'France', code: 'FRA', flag: '🇫🇷' },
  POL: { name: 'Poland', code: 'POL', flag: '🇵🇱' },
  ENG: { name: 'England', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  SEN: { name: 'Senegal', code: 'SEN', flag: '🇸🇳' },
  CRO: { name: 'Croatia', code: 'CRO', flag: '🇭🇷' },
  JPN: { name: 'Japan', code: 'JPN', flag: '🇯🇵' },
  BRA: { name: 'Brazil', code: 'BRA', flag: '🇧🇷' },
  KOR: { name: 'South Korea', code: 'KOR', flag: '🇰🇷' },
  MAR: { name: 'Morocco', code: 'MAR', flag: '🇲🇦' },
  ESP: { name: 'Spain', code: 'ESP', flag: '🇪🇸' },
  POR: { name: 'Portugal', code: 'POR', flag: '🇵🇹' },
  SUI: { name: 'Switzerland', code: 'SUI', flag: '🇨🇭' },
  GER: { name: 'Germany', code: 'GER', flag: '🇩🇪' },
  BEL: { name: 'Belgium', code: 'BEL', flag: '🇧🇪' },
  MEX: { name: 'Mexico', code: 'MEX', flag: '🇲🇽' },
  DEN: { name: 'Denmark', code: 'DEN', flag: '🇩🇰' },
  URU: { name: 'Uruguay', code: 'URU', flag: '🇺🇾' },
  GHA: { name: 'Ghana', code: 'GHA', flag: '🇬🇭' },
  ITA: { name: 'Italy', code: 'ITA', flag: '🇮🇹' },
  NGA: { name: 'Nigeria', code: 'NGA', flag: '🇳🇬' },
  COL: { name: 'Colombia', code: 'COL', flag: '🇨🇴' },
  SWE: { name: 'Sweden', code: 'SWE', flag: '🇸🇪' },
  SRB: { name: 'Serbia', code: 'SRB', flag: '🇷🇸' },
  CMR: { name: 'Cameroon', code: 'CMR', flag: '🇨🇲' },
  UKR: { name: 'Ukraine', code: 'UKR', flag: '🇺🇦' },
  AUT: { name: 'Austria', code: 'AUT', flag: '🇦🇹' },
  GRE: { name: 'Greece', code: 'GRE', flag: '🇬🇷' },
  CIV: { name: 'Ivory Coast', code: 'CIV', flag: '🇨🇮' },
}

// Round of 32 — all played. Each tuple: [home, away, homeScore, awayScore, venue]
const R32_RESULTS: [BracketTeam, BracketTeam, number, number, string][] = [
  [T.NED, T.USA, 3, 1, 'MetLife Stadium'],
  [T.ARG, T.AUS, 2, 1, 'AT&T Stadium'],
  [T.FRA, T.POL, 3, 1, 'SoFi Stadium'],
  [T.ENG, T.SEN, 3, 0, 'Mercedes-Benz Stadium'],
  [T.CRO, T.JPN, 2, 1, 'Lumen Field'],
  [T.BRA, T.KOR, 4, 1, 'Hard Rock Stadium'],
  [T.MAR, T.ESP, 2, 0, 'Levi’s Stadium'],
  [T.POR, T.SUI, 6, 1, 'Lincoln Financial Field'],
  [T.GER, T.BEL, 2, 1, 'Arrowhead Stadium'],
  [T.MEX, T.DEN, 2, 1, 'Estadio Azteca'],
  [T.URU, T.GHA, 3, 0, 'NRG Stadium'],
  [T.ITA, T.NGA, 2, 1, 'Gillette Stadium'],
  [T.COL, T.SWE, 2, 0, 'BC Place'],
  [T.SRB, T.CMR, 1, 0, 'BMO Field'],
  [T.UKR, T.AUT, 2, 1, 'Estadio Akron'],
  [T.GRE, T.CIV, 1, 0, 'Estadio BBVA'],
]

const r32: BracketMatch[] = R32_RESULTS.map(([home, away, hs, as, venue], i) => ({
  id: `R32-${i + 1}`,
  home,
  away,
  homeScore: hs,
  awayScore: as,
  date: `2026-06-2${i < 8 ? '0' : '1'}`,
  venue,
}))

// Round of 16 — winners seeded, fixtures scheduled, not yet played (no scores).
const R16_PAIRS: [BracketTeam, BracketTeam, string, string][] = [
  [T.NED, T.ARG, '2026-06-29', 'MetLife Stadium'],
  [T.FRA, T.ENG, '2026-06-29', 'SoFi Stadium'],
  [T.CRO, T.BRA, '2026-06-30', 'Hard Rock Stadium'],
  [T.MAR, T.POR, '2026-06-30', 'Lincoln Financial Field'],
  [T.GER, T.MEX, '2026-07-01', 'Estadio Azteca'],
  [T.URU, T.ITA, '2026-07-01', 'NRG Stadium'],
  [T.COL, T.SRB, '2026-07-02', 'BC Place'],
  [T.UKR, T.GRE, '2026-07-02', 'AT&T Stadium'],
]

const r16: BracketMatch[] = R16_PAIRS.map(([home, away, date, venue], i) => ({
  id: `R16-${i + 1}`,
  home,
  away,
  date,
  venue,
}))

// Quarter-finals onward — slots not yet filled (TBD).
const qf: BracketMatch[] = Array.from({ length: 4 }, (_, i) => ({
  id: `QF-${i + 1}`,
  date: i < 2 ? '2026-07-04' : '2026-07-05',
  venue: 'TBD',
}))

const sf: BracketMatch[] = Array.from({ length: 2 }, (_, i) => ({
  id: `SF-${i + 1}`,
  date: i === 0 ? '2026-07-08' : '2026-07-09',
  venue: 'TBD',
}))

const final: BracketMatch[] = [
  {
    id: 'final-1',
    date: '2026-07-12',
    venue: 'MetLife Stadium',
  },
]

export const bracket: Bracket = {
  tournament: 'World Cup 2026',
  asOf: '2026-06-26',
  sample: true,
  note: 'Illustrative knockout draw. Results beyond the Round of 32 are not yet played.',
  rounds: [
    { id: 'R32', label: 'Round of 32', matches: r32 },
    { id: 'R16', label: 'Round of 16', matches: r16 },
    { id: 'QF', label: 'Quarter-finals', matches: qf },
    { id: 'SF', label: 'Semi-finals', matches: sf },
    { id: 'final', label: 'Final', matches: final },
  ],
}
