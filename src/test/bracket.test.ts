import { describe, it, expect } from 'vitest'
import { bracket } from '../data/bracket'
import { isPlayed } from '../lib/bracket'
import type { RoundId } from '../types'

describe('bracket data', () => {
  it('runs R32 → final in order', () => {
    const ids = bracket.rounds.map((r) => r.id)
    expect(ids).toEqual<RoundId[]>(['R32', 'R16', 'QF', 'SF', 'final'])
  })

  it('has fixture counts 16 / 8 / 4 / 2 / 1', () => {
    expect(bracket.rounds.map((r) => r.matches.length)).toEqual([16, 8, 4, 2, 1])
  })

  it('is flagged as sample data', () => {
    expect(bracket.sample).toBe(true)
  })

  it('uses globally unique match ids', () => {
    const ids = bracket.rounds.flatMap((r) => r.matches.map((m) => m.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('never shows a score before a match is played', () => {
    for (const round of bracket.rounds) {
      for (const match of round.matches) {
        const hasHome = match.homeScore !== undefined
        const hasAway = match.awayScore !== undefined
        // Scores come as a pair or not at all — never a half-score.
        expect(hasHome).toBe(hasAway)
        // A scored match must have both teams present (can't score a TBD slot).
        if (isPlayed(match)) {
          expect(match.home).toBeDefined()
          expect(match.away).toBeDefined()
        }
      }
    }
  })

  it('treats upcoming and TBD rounds as not played (no scores)', () => {
    const upcoming = bracket.rounds.filter((r) => r.id !== 'R32')
    for (const round of upcoming) {
      for (const match of round.matches) {
        expect(isPlayed(match)).toBe(false)
      }
    }
    // The Round of 32 is fully played in the sample.
    const r32 = bracket.rounds.find((r) => r.id === 'R32')!
    expect(r32.matches.every(isPlayed)).toBe(true)
  })
})
