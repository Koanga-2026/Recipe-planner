import { fetchRecipes } from '../apis/recipes.ts'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import DeleteButton from './DeleteButton.tsx'
import AddRecipe from './AddRecipe'

function Home() {
  const { isAuthenticated } = useAuth0()
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
      {isAuthenticated && <AddRecipe />}
      <ul>
        {recipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <Link to={'/recipe/' + recipe.id}>{recipe.name}</Link>
              {isAuthenticated && <DeleteButton id={recipe.id} />}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Home