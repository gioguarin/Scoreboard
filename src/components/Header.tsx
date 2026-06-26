import { Trophy, FlaskConical } from 'lucide-react'

interface HeaderProps {
  tournament: string
  stage: string
  asOf: string
  sample: boolean
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Header({ tournament, stage, asOf, sample }: HeaderProps) {
  return (
    <header className="px-4 pt-4 pb-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
          <Trophy className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              {tournament}
            </h1>
            {sample && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                <FlaskConical className="h-3 w-3" aria-hidden />
                Sample data
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-400">
            <span className="font-medium text-accent">{stage}</span>
            <span className="mx-1.5 text-slate-600">·</span>
            <span className="nums">as of {formatDate(asOf)}</span>
          </p>
        </div>
      </div>
    </header>
  )
}
