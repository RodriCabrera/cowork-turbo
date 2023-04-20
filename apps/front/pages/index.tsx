import { TestInterface } from 'types'
import { NavBar } from './NavBar'
import { CompanyBanner } from './CompanyBanner'

export default function Web() {
  const something: TestInterface = { test: 'as' }
  console.log(something)

  return (
    <div className="bg-gray-100">
      <NavBar />
      <CompanyBanner />
    </div>
  )
}
