import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { Modal } from '@/components/modals'
import { useApi } from '@/context/apiContext'

export const DeleteCowork = ({ coworkId }: { coworkId: string }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const api = useApi()
  const queryClient = useQueryClient()

  const deleteCowork = useMutation({
    mutationFn: (coworkId: string) => {
      return api.delete(`/coworks/${coworkId}`)
    },
    onSuccess: () => {
      toast.success('Cowork deleted successfully')
      queryClient.invalidateQueries({
        queryKey: ['coworks']
      })
      setIsDeleteModalOpen(false)
    }
  })

  const generateDeleteStatusText = () => {
    if (deleteCowork.isLoading) return 'Deleting cowork...'
    if (deleteCowork.isError) return 'Error deleting cowork'
    return 'Delete'
  }

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        close={() => setIsDeleteModalOpen(false)}
        confirm={() => deleteCowork.mutate(coworkId)}
        title="Delete Cowork"
        description="This action can not be undone"
        body="Consider setting the cowork status as inactive"
        confirmButton={generateDeleteStatusText()}
      />
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="mr-2 w-4 cursor-pointer hover:scale-110 hover:text-purple-500"
      >
        <AiOutlineDelete />
      </button>
    </>
  )
}
