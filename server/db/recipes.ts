import db from './connection'
import { Recipe, RecipeData } from '../../models/recipe'

const columns = ['id', 'name', 'description', 'instruction']

export async function addRecipe(data: RecipeData) {
  const [recipe] = await db('recipes')
    .insert({
      name: data.name,
      description: data.description,
      instruction: data.instruction,
    })
    .returning(columns)

  return recipe as Recipe
}
