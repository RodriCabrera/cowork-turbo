import React, { useState } from 'react'

const STATUS = {
  loading: 'loading',
  sent: 'sent',
  error: 'error',
  waiting: 'waiting'
} as const

type StatusKeys = keyof typeof STATUS

export const SuperadminLogin = () => {
  const [enteredEmail, setEnteredEmail] = useState<string>('')

  // TODO: Display status (now its only text) they should alter the UI
  const [queryStatus, setQueryStatus] = useState<StatusKeys>(STATUS.waiting)
  const [btnMessage, setBtnMessage] = useState<string>('Sign in')

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryStatus(STATUS.loading)
    setBtnMessage('Checking email...')
    fetch('http://localhost:8000/superadmin/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: enteredEmail })
    })
      .then((res) => {
        if (res.status === 200) {
          setQueryStatus(STATUS.sent)
          // TODO: Change form to display just the OK message
          setBtnMessage('Email sent, check your inbox')
        }
        if (res.status === 401) throw new Error('Email not found')
      })
      .catch((err) => {
        setQueryStatus(STATUS.error)
        if (err instanceof Error) {
          setBtnMessage(err.message)
        } else setBtnMessage('Could not send mail')
      })
      .finally(() => {
        setTimeout(() => {
          setQueryStatus(STATUS.waiting)
          setBtnMessage('Sign in')
        }, 5000)
      })
  }

  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEnteredEmail(e.target.value)

  return (
    <section className="mx-auto flex h-[calc(100vh-62px)] flex-col items-center justify-center bg-gray-50 px-6 py-8 lg:py-0">
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={formSubmitHandler}
          >
            <div>
              <label htmlFor="email" className="mb-2 block text-xl">
                Email
              </label>
              <input
                type="email"
                value={enteredEmail}
                onChange={emailInputChangeHandler}
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                required
                disabled={queryStatus !== STATUS.waiting}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-green-100/75 px-5 py-2.5 text-center text-base font-light text-black hover:bg-green-200/75 focus:outline-none focus:ring-4"
            >
              {btnMessage}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
