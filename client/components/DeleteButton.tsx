import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { deleteRecipe } from '../apis/recipes'

interface Props {
  id: number
}

function DeleteButton({ id }: Props) {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently()
      if (!token) throw new Error('No access token found')
      return deleteRecipe(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Recipes'] })
    },
  })

  const handleDelete = () => {
    console.log('deleting', id)
    deleteMutation.mutate()
  }

  return (
    <>
      <button onClick={handleDelete}>X</button>
    </>
  )
}

export default DeleteButton
