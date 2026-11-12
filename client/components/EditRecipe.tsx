import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRecipe } from '../apis/recipes'
import { Recipes } from '../../models/recipes'
import { RecipeData } from '../../models/recipe'

interface Props {
  recipe: Recipes
  onDone: () => void
}

function EditRecipe({ recipe, onDone }: Props) {
  const [item, setItem] = useState<RecipeData>({
    name: recipe.name,
    description: recipe.description ?? '',
    instruction: recipe.instruction ?? '',
  })
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (updatedRecipe: RecipeData) =>
      updateRecipe(recipe.id, updatedRecipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Recipes'] })
      queryClient.invalidateQueries({ queryKey: ['recipe'] })
      onDone()
    },
  })

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target
    setItem({
      ...item,
      [name]: value,
    })
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    updateMutation.mutate(item)
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3>Edit recipe:</h3>
      <div>
        <label htmlFor={`name-${recipe.id}`}>Name: </label>
        <input
          id={`name-${recipe.id}`}
          name="name"
          value={item.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor={`description-${recipe.id}`}>Description: </label>
        <input
          id={`description-${recipe.id}`}
          name="description"
          value={item.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor={`instruction-${recipe.id}`}>Instructions: </label>
        <textarea
          id={`instruction-${recipe.id}`}
          name="instruction"
          value={item.instruction}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save changes</button>
      <button type="button" onClick={onDone}>
        Cancel
      </button>
      {updateMutation.error && <p>Error: {updateMutation.error.message}</p>}
    </form>
  )
}

export default EditRecipe
