import request from 'superagent'
import { Recipe, RecipeData } from '../../models/recipe'

const rootUrl = '/api/v1'

export async function addRecipe(newRecipe: RecipeData): Promise<Recipe> {
  const res = await request.post(`${rootUrl}/recipes`).send(newRecipe)
  return res.body
}
