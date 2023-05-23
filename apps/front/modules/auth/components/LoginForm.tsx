import Axios from '@/common/utils/axios'
import { AxiosError } from 'axios'
import { useState } from 'react'

const STATUS = {
  loading: 'loading',
  sent: 'sent',
  error: 'error',
  waiting: 'waiting'
} as const

type StatusKeys = keyof typeof STATUS

export const LoginForm = ({ endpoint }: { endpoint: string }) => {
  const [enteredEmail, setEnteredEmail] = useState<string>('')
  const [queryStatus, setQueryStatus] = useState<StatusKeys>(STATUS.waiting)
  const [btnMessage, setBtnMessage] = useState<string>('Sign in')

  const api = Axios.getInstance()

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryStatus(STATUS.loading)
    setBtnMessage('Checking email...')
    api
      .post(endpoint, {
        email: enteredEmail
      })
      .then((res) => {
        setQueryStatus(STATUS.sent)
        setBtnMessage('Email sent, check your inbox')
      })
      .catch((err: AxiosError) => {
        setQueryStatus(STATUS.error)
        if (err instanceof Error) {
          setBtnMessage('Could not send mail')
        }
      })
      .finally(() => {
        setTimeout(() => {
          setQueryStatus(STATUS.waiting)
          setBtnMessage('Sign in')
          setEnteredEmail('')
        }, 5000)
      })
  }

  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEnteredEmail(e.target.value)

  return (
    <section className="mx-auto flex  w-full flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={formSubmitHandler}
          >
            <div>
              <label htmlFor="email" className="mb-2 block">
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
              className={`w-full rounded-lg bg-green-100/75 px-5 py-2.5 text-center text-base font-light text-black hover:bg-green-200/75 focus:outline-none focus:ring-4 ${
                queryStatus === STATUS.error &&
                'bg-red-100/75 hover:bg-red-200/75'
              }`}
            >
              {btnMessage}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
