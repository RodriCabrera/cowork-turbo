import { CompanyBanner } from '@/components/CompanyBanner'
import { Button } from 'ui'

const Landing = () => {
  return (
    <>
      <h1 className="px-2 py-4 text-4xl md:text-5xl">BaseBloom</h1>
      <CompanyBanner />
      <Button />
    </>
  )
}

export default Landing
