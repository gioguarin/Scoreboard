import { describe, it, expect } from 'vitest'
import { standings } from '../data/standings'
import { goalDiff, rankTeams, withPoints } from '../lib/standings'
import type { Team } from '../types'

describe('standings data', () => {
  it('has 12 groups (A–L) of 4 teams each', () => {
    expect(standings.groups).toHaveLength(12)
    const ids = standings.groups.map((g) => g.id)
    expect(ids).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'])
    for (const group of standings.groups) {
      expect(group.teams).toHaveLength(4)
    }
  })

  it('is flagged as sample data', () => {
    expect(standings.sample).toBe(true)
  })

  it('keeps points consistent with each W/D/L record', () => {
    for (const group of standings.groups) {
      for (const team of group.teams) {
        expect(team.points).toBe(team.won * 3 + team.drawn)
      }
    }
  })

  it('keeps played equal to W + D + L', () => {
    for (const group of standings.groups) {
      for (const team of group.teams) {
        expect(team.played).toBe(team.won + team.drawn + team.lost)
      }
    }
  })
})

describe('withPoints', () => {
  it('derives played and points from the record', () => {
    const team = withPoints({
      code: 'TST',
      name: 'Test',
      flag: '🏳️',
      won: 2,
      drawn: 1,
      lost: 0,
      goalsFor: 5,
      goalsAgainst: 1,
    })
    expect(team.played).toBe(3)
    expect(team.points).toBe(7)
  })
})

describe('goalDiff', () => {
  it('returns goals for minus against', () => {
    expect(goalDiff({ goalsFor: 5, goalsAgainst: 2 })).toBe(3)
    expect(goalDiff({ goalsFor: 1, goalsAgainst: 4 })).toBe(-3)
  })
})

describe('rankTeams', () => {
  const t = (over: Partial<Team>): Team =>
    withPoints({
      code: over.code ?? 'XXX',
      name: over.name ?? 'X',
      flag: '🏳️',
      won: over.won ?? 0,
      drawn: over.drawn ?? 0,
      lost: over.lost ?? 0,
      goalsFor: over.goalsFor ?? 0,
      goalsAgainst: over.goalsAgainst ?? 0,
    })

  it('orders by points, then goal difference, then goals for, then name', () => {
    const a = t({ name: 'Alpha', won: 3, goalsFor: 6, goalsAgainst: 1 }) // 9 pts, GD +5
    const b = t({ name: 'Bravo', won: 2, drawn: 1, goalsFor: 4, goalsAgainst: 2 }) // 7
    const c = t({ name: 'Charlie', won: 2, drawn: 1, goalsFor: 3, goalsAgainst: 1 }) // 7, same GD +2, fewer GF
    const ranked = rankTeams([b, c, a])
    expect(ranked.map((x) => x.name)).toEqual(['Alpha', 'Bravo', 'Charlie'])
  })

  it('breaks an exact tie by name (A→Z)', () => {
    const zeta = t({ name: 'Zeta', won: 1 })
    const acme = t({ name: 'Acme', won: 1 })
    const ranked = rankTeams([zeta, acme])
    expect(ranked.map((x) => x.name)).toEqual(['Acme', 'Zeta'])
  })

  it('does not mutate its input', () => {
    const input = [
      t({ name: 'Low', won: 0 }),
      t({ name: 'High', won: 3 }),
    ]
    const snapshot = input.map((x) => x.name)
    const ranked = rankTeams(input)
    expect(input.map((x) => x.name)).toEqual(snapshot)
    expect(ranked).not.toBe(input)
  })
})
