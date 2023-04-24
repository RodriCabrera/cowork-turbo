import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { SuperadminLogin } from '@/components/superadmin/SuperadminLogin'

describe('Superadmin Login', () => {
  test('renders the superadmin login form', async () => {
    const { getByRole, getByText } = render(<SuperadminLogin />)

    const signInButton = getByRole('button', { name: 'Sign in' })

    expect(signInButton).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
  })
})
