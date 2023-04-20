import Item from '@/components/Item'
import { Button } from 'ui'
import { TestInterface } from 'types'
import NavBar from '../components/NavBar'

export default function Web() {
  const something: TestInterface = { test: 'as' }
  console.log(something)

  return (
    <div className="bg-diarpu">
      <NavBar />
      <h1 className="px-2 py-4 text-4xl md:text-5xl">Web</h1>
      <Button />
      <Item />
    </div>
  )
}
