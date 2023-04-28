import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

export const ActionsCell = ({ coworkId }: { coworkId: string }) => {
  return (
    <div className="flex items-center ">
      <div className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
        <AiOutlineEye />
      </div>
      <div className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
        <AiOutlineEdit />
      </div>
      <div className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
        <AiOutlineDelete />
      </div>
    </div>
  )
}
