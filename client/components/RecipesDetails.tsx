import { useParams } from 'react-router'
import { fetchRecipe } from '../apis/recipes'
import { useQuery } from '@tanstack/react-query'

function RecipesDetails() {
  const { id } = useParams()

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
    return <p> Loading</p>
  }

  if (isError) {
    return <p>Error the recipe book was not found! {error.message}</p>
  }
  return (
    <>
      <h1>{recipe.name}</h1>
      <h2>{`Description: ${recipe.description}`}</h2>
      <h2>{`Method: ${recipe.instruction}`}</h2>
      <h2>{`Day: ${recipe.plannedDay}`}</h2>
      <h2>{`Meal: ${recipe.mealType}`}</h2>
    </>
  )
}

export default RecipesDetails
