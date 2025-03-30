import { render, screen } from '@testing-library/react'
import Home from './index'

describe('Home', () => {
  it('renders GreenAI heading', () => {
    render(<Home />)
    const heading = screen.getByText('GreenAI')
    expect(heading).toBeInTheDocument()
  })
}) 