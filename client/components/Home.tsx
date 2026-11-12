import { fetchRecipes } from '../apis/recipes.ts'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import DeleteButton from './DeleteButton.tsx'
import AddRecipe from './AddRecipe'

function Home() {
  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ['Recipes'], queryFn: () => fetchRecipes() })

  if (isPending) {
    return <p className="page-state">Loading recipes…</p>
  }

  if (isError) {
    return <p className="page-state">{error.message}</p>
  }

  return (
    <div className="home-layout">
      <AddRecipe />
      <section className="recipe-panel" id="menu">
        <p className="section-eyebrow">From your kitchen</p>
        <h2>Today&apos;s Recipe Menu</h2>
        <ul className="recipe-list">
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id}>
                <Link to={'/recipe/' + recipe.id}>{recipe.name}</Link>
                <DeleteButton id={recipe.id} />
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default Home
