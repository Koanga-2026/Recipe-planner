import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { addRecipe } from '../apis/recipes'
import { RecipeData } from '../../models/recipe'

const emptyRecipe: RecipeData = {
  name: '',
  description: '',
  instruction: '',
}

function AddRecipe() {
  const [item, setItem] = useState<RecipeData>(emptyRecipe)
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const addMutation = useMutation({
    mutationFn: async (newRecipe: RecipeData) => {
      const token = await getAccessTokenSilently()
      if (!token) throw new Error('No access token found')
      return addRecipe(newRecipe, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Recipes'] })
      setItem(emptyRecipe)
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
    addMutation.mutate(item)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a recipe:</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          name="name"
          value={item.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          name="description"
          value={item.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="instruction">Instructions: </label>
        <textarea
          id="instruction"
          name="instruction"
          value={item.instruction}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Add recipe</button>
    </form>
  )
}

export default AddRecipe
