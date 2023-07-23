import { useRouter } from 'next/router'
import { AiOutlineEye, AiOutlineEdit } from 'react-icons/ai'

import { DeleteCowork } from './DeleteCowork'

export const ActionsCell = ({ coworkId }: { coworkId: string }) => {
  const router = useRouter()
  return (
    <div className="flex items-center ">
      <button className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
        <AiOutlineEye />
      </button>
      <button
        onClick={() => router.push(`coworks/edit/${coworkId}`)}
        className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500"
      >
        <AiOutlineEdit />
      </button>
      <DeleteCowork coworkId={coworkId} />
    </div>
  )
}
