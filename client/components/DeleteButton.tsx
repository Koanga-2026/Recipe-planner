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
    deleteMutation.mutate()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        aria-label={`Delete recipe ${id}`}
      >
        {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
      </button>
      {deleteMutation.error && (
        <p role="alert">
          Unable to delete recipe: {deleteMutation.error.message}
        </p>
      )}
    </>
  )
}

export default DeleteButton
