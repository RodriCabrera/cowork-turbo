import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NavBar } from '@/common/components/Layout/NavBar'

describe('User Home', () => {
  test('renders a heading', () => {
    const { getByText } = render(<NavBar />)

    const heading = getByText('BaseBloom')

    expect(heading).toBeInTheDocument()
  })
})
