import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Login } from '@/components/Login'

describe('Superadmin Login', () => {
  test('renders the superadmin login form', async () => {
    const { getByRole, getByText } = render(<Login endpoint="login" />)

    const signInButton = getByRole('button', { name: 'Sign in' })

    expect(signInButton).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
  })
})
