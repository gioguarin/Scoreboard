import type { Group, Standings, Team } from '../types'
import { withPoints } from '../lib/standings'

// ---------------------------------------------------------------------------
// SAMPLE DATA — illustrative only, not an official feed.
//
// To wire a real source, replace `standings` with a fetch that returns the
// `Standings` shape (see src/types.ts). Nothing in the components needs to
// change. Points are derived from W/D/L via `withPoints`, so the records here
// are the single source of truth.
// ---------------------------------------------------------------------------

/** [won, drawn, lost, goalsFor, goalsAgainst] */
type Line = [number, number, number, number, number]

// Each template is a self-consistent 4-team round-robin (every side plays 3),
// listed in finishing order. Two shapes add a little variety across groups.
const TEMPLATE_A: Line[] = [
  [3, 0, 0, 7, 1],
  [2, 0, 1, 3, 3],
  [1, 0, 2, 2, 3],
  [0, 0, 3, 1, 6],
]
const TEMPLATE_B: Line[] = [
  [2, 1, 0, 4, 1],
  [1, 2, 0, 6, 4],
  [0, 2, 1, 3, 5],
  [0, 1, 2, 2, 5],
]

type Entry = [code: string, name: string, flag: string]

function makeGroup(id: string, template: Line[], entries: Entry[]): Group {
  const teams: Team[] = entries.map(([code, name, flag], i) => {
    const [won, drawn, lost, goalsFor, goalsAgainst] = template[i]
    return withPoints({ code, name, flag, won, drawn, lost, goalsFor, goalsAgainst })
  })
  return { id, teams }
}

const groups: Group[] = [
  makeGroup('A', TEMPLATE_A, [
    ['NED', 'Netherlands', '🇳🇱'],
    ['SEN', 'Senegal', '🇸🇳'],
    ['ECU', 'Ecuador', '🇪🇨'],
    ['QAT', 'Qatar', '🇶🇦'],
  ]),
  makeGroup('B', TEMPLATE_B, [
    ['ENG', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'],
    ['USA', 'United States', '🇺🇸'],
    ['WAL', 'Wales', '🏴󠁧󠁢󠁷󠁬󠁳󠁿'],
    ['IRN', 'Iran', '🇮🇷'],
  ]),
  makeGroup('C', TEMPLATE_A, [
    ['ARG', 'Argentina', '🇦🇷'],
    ['POL', 'Poland', '🇵🇱'],
    ['MEX', 'Mexico', '🇲🇽'],
    ['KSA', 'Saudi Arabia', '🇸🇦'],
  ]),
  makeGroup('D', TEMPLATE_B, [
    ['FRA', 'France', '🇫🇷'],
    ['DEN', 'Denmark', '🇩🇰'],
    ['TUN', 'Tunisia', '🇹🇳'],
    ['AUS', 'Australia', '🇦🇺'],
  ]),
  makeGroup('E', TEMPLATE_A, [
    ['ESP', 'Spain', '🇪🇸'],
    ['GER', 'Germany', '🇩🇪'],
    ['JPN', 'Japan', '🇯🇵'],
    ['CRC', 'Costa Rica', '🇨🇷'],
  ]),
  makeGroup('F', TEMPLATE_B, [
    ['CRO', 'Croatia', '🇭🇷'],
    ['MAR', 'Morocco', '🇲🇦'],
    ['BEL', 'Belgium', '🇧🇪'],
    ['CAN', 'Canada', '🇨🇦'],
  ]),
  makeGroup('G', TEMPLATE_A, [
    ['BRA', 'Brazil', '🇧🇷'],
    ['SUI', 'Switzerland', '🇨🇭'],
    ['SRB', 'Serbia', '🇷🇸'],
    ['CMR', 'Cameroon', '🇨🇲'],
  ]),
  makeGroup('H', TEMPLATE_B, [
    ['POR', 'Portugal', '🇵🇹'],
    ['KOR', 'South Korea', '🇰🇷'],
    ['URU', 'Uruguay', '🇺🇾'],
    ['GHA', 'Ghana', '🇬🇭'],
  ]),
  makeGroup('I', TEMPLATE_A, [
    ['ITA', 'Italy', '🇮🇹'],
    ['NOR', 'Norway', '🇳🇴'],
    ['NGA', 'Nigeria', '🇳🇬'],
    ['EGY', 'Egypt', '🇪🇬'],
  ]),
  makeGroup('J', TEMPLATE_B, [
    ['COL', 'Colombia', '🇨🇴'],
    ['SWE', 'Sweden', '🇸🇪'],
    ['CHI', 'Chile', '🇨🇱'],
    ['ALG', 'Algeria', '🇩🇿'],
  ]),
  makeGroup('K', TEMPLATE_A, [
    ['AUT', 'Austria', '🇦🇹'],
    ['UKR', 'Ukraine', '🇺🇦'],
    ['PER', 'Peru', '🇵🇪'],
    ['TUR', 'Türkiye', '🇹🇷'],
  ]),
  makeGroup('L', TEMPLATE_B, [
    ['CIV', 'Ivory Coast', '🇨🇮'],
    ['GRE', 'Greece', '🇬🇷'],
    ['SCO', 'Scotland', '🏴󠁧󠁢󠁳󠁣󠁴󠁿'],
    ['PAR', 'Paraguay', '🇵🇾'],
  ]),
]

export const standings: Standings = {
  tournament: 'World Cup 2026',
  stage: 'Round of 16',
  asOf: '2026-06-26',
  sample: true,
  groups,
}
