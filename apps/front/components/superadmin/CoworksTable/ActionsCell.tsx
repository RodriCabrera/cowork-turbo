import { AiOutlineEye, AiOutlineEdit } from 'react-icons/ai'

import { DeleteCowork } from './DeleteCowork'

export const ActionsCell = ({ coworkId }: { coworkId: string }) => (
  <div className="flex items-center ">
    <button className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
      <AiOutlineEye />
    </button>
    <button className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
      <AiOutlineEdit />
    </button>
    <DeleteCowork coworkId={coworkId} />
  </div>
)
