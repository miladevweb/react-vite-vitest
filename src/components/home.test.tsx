import Home from '../pages/home'
import { screen, render } from '@testing-library/react'

describe('Home', () => {
  test('should render home', () => {
    render(<Home />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
