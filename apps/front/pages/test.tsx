import Item from '@/components/Item'
import { Button } from 'ui'

import NavBar from '../components/NavBar'

export default function Test() {
  return (
    <div>
      <NavBar />
      <h1 className="px-2 py-4 text-4xl md:text-5xl">Test Page</h1>

      <Button />
      <Item />
    </div>
  )
}
