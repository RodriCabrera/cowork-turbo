import { AxiosInstance } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

export const useMutateCredits = (
  api: AxiosInstance,
  walletId: string | undefined
) => {
  const queryClient = useQueryClient()
  const mutateCredits = useMutation({
    mutationFn: (ammount: number) => {
      return api.post(`/credits/${walletId}`, {
        ammount
      })
    },

    onMutate: async (newAmount) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['credits', { id: walletId }]
      })

      // Snapshot the previous value
      const previousCredits = queryClient.getQueryData([
        'credits',
        { id: walletId }
      ])

      // Optimistically update to the new value
      queryClient.setQueryData(['credits', { id: walletId }], (old: any) => {
        return {
          ...old,
          credits: old.credits + newAmount
        }
      })

      // Return a context object with the snapshotted value
      return { previousCredits }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error, _, context) => {
      console.log(error)
      toast.error('Could not add credits, try again later')
      queryClient.setQueryData(
        ['credits', { id: walletId }],
        context?.previousCredits
      )
    },

    onSuccess: () => {
      toast.success('Credits added successfully')
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['credits', { id: walletId }] })
    }
  })

  return mutateCredits
}
