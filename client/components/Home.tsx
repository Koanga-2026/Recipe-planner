import { fetchRecipe, fetchRecipes } from '../apis/recipes.ts'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

function Home() {
  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ['Recipes'], queryFn: () => fetchRecipes() })

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <Link to={'/recipe/' + recipe.id}>{recipe.name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Home
