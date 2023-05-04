import { useState } from 'react'
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'

import { Modal } from '@/components/modals'
import { useApi } from '@/context/apiContext'

interface ActionsCellProps {
  coworkId: string
}

export const ActionsCell = ({ coworkId }: ActionsCellProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const api = useApi()
  const queryClient = useQueryClient()

  const deleteCowork = useMutation({
    mutationFn: (coworkId: string) => {
      return api.delete(`/coworks/${coworkId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coworks']
      })
    }
  })

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        close={() => setIsDeleteModalOpen(false)}
        confirm={() => deleteCowork.mutate(coworkId)}
        title="Delete Cowork"
        description="This action can not be undone"
        body="Consider setting the cowork status as inactive"
        confirmButton="Delete"
      />
      <div className="flex items-center ">
        <button className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
          <AiOutlineEye />
        </button>
        <button className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500">
          <AiOutlineEdit />
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500"
        >
          <AiOutlineDelete />
        </button>
      </div>
    </>
  )
}
