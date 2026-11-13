import { useState } from 'react'
import { fetchRecipes } from '../apis/recipes.ts'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import DeleteButton from './DeleteButton.tsx'
import AddRecipe from './AddRecipe'

function Home() {
  const { isAuthenticated } = useAuth0()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMealType, setSelectedMealType] = useState('all')
  const navigate = useNavigate()
  const {
    data: recipes,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ['Recipes'], queryFn: () => fetchRecipes() })

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  if (isPending) {
    return <p className="page-state">Loading recipes…</p>
  }

  if (isError) {
    return <p className="page-state">{error.message}</p>
  }

  const mealTypes = [
    ...new Set(
      recipes
        .map((recipe) => recipe.mealType)
        .filter(
          (mealType): mealType is string =>
            typeof mealType === 'string' && mealType.trim().length > 0,
        ),
    ),
  ].sort((first, second) => first.localeCompare(second))
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(normalizedSearchTerm) &&
      (selectedMealType === 'all' || recipe.mealType === selectedMealType),
  )
  let emptyMessage = 'No recipes here yet.'
  if (normalizedSearchTerm || selectedMealType !== 'all') {
    emptyMessage = 'No recipes match these filters.'
  }

  const handleSurprise = () => {
    const recipe =
      filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)]
    if (recipe) navigate(`/recipe/${recipe.id}`)
  }

  return (
    <div className="home-layout">
      {isAuthenticated && <AddRecipe />}
      <section className="recipe-panel" id="menu">
        <p className="section-eyebrow">From your kitchen</p>
        <h2>Today&apos;s Recipe Menu</h2>
        <div className="recipe-search" role="search" aria-label="Recipe search">
          <label htmlFor="recipe-search">Find a recipe</label>
          <div className="recipe-search-field">
            <span className="recipe-search-icon" aria-hidden="true" />
            <input
              id="recipe-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              placeholder="Search by recipe name"
            />
          </div>
          <div className="recipe-filter">
            <label htmlFor="meal-filter">Browse by meal</label>
            <select
              id="meal-filter"
              value={selectedMealType}
              onChange={(event) => setSelectedMealType(event.currentTarget.value)}
            >
              <option value="all">All meals</option>
              {mealTypes.map((mealType) => (
                <option key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>
          </div>
          <div className="recipe-search-meta">
            <p className="recipe-results" aria-live="polite">
              {filteredRecipes.length}{' '}
              {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} shown
            </p>
            <button
              className="recipe-surprise"
              type="button"
              onClick={handleSurprise}
              disabled={filteredRecipes.length === 0}
            >
              Surprise me
            </button>
          </div>
        </div>
        <ul className="recipe-list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Link className="recipe-entry" to={'/recipe/' + recipe.id}>
                  <span className="recipe-entry-name">{recipe.name}</span>
                  <span className="recipe-entry-meta">
                    <span className="recipe-tag recipe-tag-day">
                      Day · {recipe.plannedDay ?? 'Not set'}
                    </span>
                    <span className="recipe-tag recipe-tag-meal">
                      Meal · {recipe.mealType ?? 'Not set'}
                    </span>
                  </span>
                </Link>
                {isAuthenticated && <DeleteButton id={recipe.id} />}
              </li>
            ))
          ) : (
            <li className="recipe-empty">{emptyMessage}</li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Home