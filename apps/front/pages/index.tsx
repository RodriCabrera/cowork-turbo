import { TestInterface } from 'types'
import NavBar from '../components/NavBar'
import { CompanyBanner } from '@/components/CompanyBanner'
export default function Web() {
  const something: TestInterface = { test: 'as' }
  console.log(something)

  return (
    <div>
      <NavBar />
      <CompanyBanner />
    </div>
  )
}
