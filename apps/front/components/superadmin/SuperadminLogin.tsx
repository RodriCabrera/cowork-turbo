import React, { useState } from 'react'

export const SuperadminLogin = () => {
  const [enteredEmail, setEnteredEmail] = useState('')

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('http://localhost:8000/superadmin/login', { method: 'POST', body: JSON.stringify({ email: enteredEmail }) })
      .then(res => res.status === 200 ? alert('email sent') : alert('error'))
  }

  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEnteredEmail(e.target.value)

  const styles = {
    section:
      'mx-auto flex flex-col items-center justify-center bg-gray-50 px-6 py-8 h-[calc(100vh-62px)] lg:py-0',
    card: 'w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 ',
    formContainer: 'space-y-4 p-6 sm:p-8 md:space-y-6',
    form: 'space-y-4 md:space-y-6',
    label: 'mb-2 block text-xl ',
    input:
      'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm',
    signInButton:
      'w-full rounded-lg bg-green-100/75 px-5 py-2.5 text-center text-base font-light text-black focus:outline-none focus:ring-4 hover:bg-green-200/75'
  }

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.formContainer}>
          <form className={styles.form} action="#" onSubmit={formSubmitHandler}>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                value={enteredEmail}
                onChange={emailInputChangeHandler}
                name="email"
                id="email"
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.signInButton}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
