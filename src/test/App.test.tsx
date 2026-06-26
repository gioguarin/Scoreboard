import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from '../App'

describe('<App />', () => {
  it('renders the header and a sample-data badge', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /world cup/i, level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Sample data')).toBeInTheDocument()
  })

  it('toggles between standings and bracket views', () => {
    render(<App />)
    // Standings is the default view.
    expect(screen.getByRole('region', { name: /group standings/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: /bracket/i }))
    expect(screen.getByRole('region', { name: /knockout bracket/i })).toBeInTheDocument()
  })

  it('switches group tabs to show a different group', () => {
    render(<App />)
    const standings = screen.getByRole('region', { name: /group standings/i })
    fireEvent.click(within(standings).getByRole('button', { name: 'B' }))
    expect(within(standings).getByRole('heading', { name: /group b/i })).toBeInTheDocument()
  })
})
