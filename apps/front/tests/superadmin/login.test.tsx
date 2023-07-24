import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { LoginForm } from '@/modules/auth/components/LoginForm'

describe('Superadmin/LoginForm', () => {
  test('renders the superadmin login form', async () => {
    const { getByRole, getByText } = render(<LoginForm endpoint="login" />)

    const signInButton = getByRole('button', { name: 'Log in' })

    expect(signInButton).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
  })
})
