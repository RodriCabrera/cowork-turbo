import Axios from '@/common/api/axios'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

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
  const [btnMessage, setBtnMessage] = useState<string>('Log in')

  const api = Axios.getInstance()

  const token_error = useSearchParams()?.get('token_error')

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryStatus(STATUS.loading)
    setBtnMessage('Checking email...')
    api
      .post(endpoint, {
        email: enteredEmail
      })
      .then(() => {
        setQueryStatus(STATUS.sent)
        setBtnMessage('Email sent, check your inbox')
        toast.success('Email sent, check your inbox')
      })
      .catch((err: AxiosError) => {
        setQueryStatus(STATUS.error)
        if (err instanceof Error) {
          setBtnMessage('Could not send mail')
          toast.error('Could not send mail, try again later')
        }
      })
      .finally(() => {
        setTimeout(() => {
          setQueryStatus(STATUS.waiting)
          setBtnMessage('Log in')
          setEnteredEmail('')
        }, 5000)
      })
  }

  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEnteredEmail(e.target.value)

  return (
    <section className="mx-auto flex  w-full flex-col items-center justify-center px-6 md:py-8 lg:py-0">
      <div className="w-full rounded-lg bg-white sm:max-w-md md:mt-0 md:shadow xl:p-0">
        {!!token_error && (
          <p className="pt-6 text-center font-bold text-red-400">
            {token_error}
          </p>
        )}
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
              className={`w-full rounded-lg bg-emerald-100/75 px-5 py-2.5 text-center text-base font-light text-black hover:bg-emerald-200/75 focus:outline-none focus:ring-4 ${
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
