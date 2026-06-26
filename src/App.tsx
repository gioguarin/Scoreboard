import { useState } from 'react'
import { ListOrdered, GitFork } from 'lucide-react'
import Header from './components/Header'
import StandingsView from './components/StandingsView'
import BracketView from './components/BracketView'
import { standings } from './data/standings'
import { bracket } from './data/bracket'

type Tab = 'standings' | 'bracket'

export default function App() {
  const [tab, setTab] = useState<Tab>('standings')

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col">
      <Header
        tournament={standings.tournament}
        stage={standings.stage}
        asOf={standings.asOf}
        sample={standings.sample}
      />

      {/* Two-way view toggle. */}
      <div className="px-4">
        <div
          role="tablist"
          aria-label="View"
          className="grid grid-cols-2 gap-1 rounded-xl bg-slate-900 p-1"
        >
          <button
            role="tab"
            aria-selected={tab === 'standings'}
            onClick={() => setTab('standings')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors ${
              tab === 'standings'
                ? 'bg-accent text-slate-950'
                : 'text-slate-300 hover:text-slate-100'
            }`}
          >
            <ListOrdered className="h-4 w-4" aria-hidden /> Standings
          </button>
          <button
            role="tab"
            aria-selected={tab === 'bracket'}
            onClick={() => setTab('bracket')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors ${
              tab === 'bracket'
                ? 'bg-accent text-slate-950'
                : 'text-slate-300 hover:text-slate-100'
            }`}
          >
            <GitFork className="h-4 w-4" aria-hidden /> Bracket
          </button>
        </div>
      </div>

      <main className="flex-1 px-4 pb-10 pt-4">
        {tab === 'standings' ? (
          <StandingsView standings={standings} />
        ) : (
          <BracketView bracket={bracket} />
        )}
      </main>

      <footer className="px-4 pb-6 text-[11px] text-slate-600">
        Illustrative sample data — not an official feed. Built as a static,
        client-side app.
      </footer>
    </div>
  )
}
