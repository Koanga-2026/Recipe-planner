import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteWeek, deleteRecipe } from '../apis/recipes'

interface Props {
  id: number
}

function DeleteButton({ id }: Props) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
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
