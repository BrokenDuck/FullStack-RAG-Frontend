import { render, screen } from '@testing-library/react'
import IndexPage from './IndexPage'
import { MemoryRouter } from 'react-router'

describe('<IndexPage />', () => {
  it('should render the Index Page', () => {
    const { container } = render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', {
        name: /AI Chatbot/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
