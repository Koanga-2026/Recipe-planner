import { useState } from 'react'
import { useParams } from 'react-router'
import { fetchRecipe } from '../apis/recipes'
import { useQuery } from '@tanstack/react-query'
import EditRecipe from './EditRecipe'

function RecipesDetails() {
  const { id } = useParams()
  const [editing, setEditing] = useState(false)

  const {
    data: recipe,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipe(Number(id)),
  })
  console.log(recipe)
  if (isPending) {
    return <p className="page-state">Loading recipe…</p>
  }

  if (isError) {
    return (
      <p className="page-state">
        The recipe could not be loaded. {error.message}
      </p>
    )
  }
  return (
    <article className="recipe-detail">
      <h1>{recipe.name}</h1>
      <h2>{`Description: ${recipe.description}`}</h2>
      <h2>{`Method: ${recipe.instruction}`}</h2>
      <h2>{`Day: ${recipe.plannedDay}`}</h2>
      <h2>{`Meal: ${recipe.mealType}`}</h2>

      {editing ? (
        <EditRecipe recipe={recipe} onDone={() => setEditing(false)} />
      ) : (
        <button onClick={() => setEditing(true)}>Edit recipe</button>
      )}
    </article>
  )
}

export default RecipesDetails
