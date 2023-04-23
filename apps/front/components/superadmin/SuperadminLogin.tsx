import React, { useState } from 'react'

const SuperadminLogin = () => {
  const [enteredEmail, setEnteredEmail] = useState('')

  const formSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    console.log(enteredEmail)
  }

  const emailInputHandler = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEnteredEmail(event.target.value)
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={formSubmitHandler}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2  block text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={enteredEmail}
                    onChange={emailInputHandler}
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex items-center justify-between"></div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-400/75 px-5 py-2.5 text-center text-base font-medium text-black focus:outline-none focus:ring-4"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SuperadminLogin
