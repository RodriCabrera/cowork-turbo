import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { LoginForm } from '@/components/LoginForm'

describe('Superadmin Login', () => {
  test('renders the superadmin login form', async () => {
    const { getByRole, getByText } = render(<LoginForm endpoint="login" />)

    const signInButton = getByRole('button', { name: 'Sign in' })

    expect(signInButton).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
  })
})
