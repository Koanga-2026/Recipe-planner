import request from 'superagent'
import { Recipes, WeeklyPlan } from '../../models/recipes.ts'
import { RecipeData } from '../../models/recipe'

const rootURL = new URL('/api/v1/recipes', document.baseURI)
const otherRootURL = new URL('/api/v1/week', document.baseURI)

export async function fetchRecipes() {
  const res = await request.get(`${rootURL}`)
  return res.body as Recipes[]
}

export async function fetchRecipe(id: number) {
  const res = await request.get(`${rootURL}/${id}`)
  return res.body as Recipes
}

export async function addRecipe(
  newRecipe: RecipeData,
  token: string,
): Promise<Recipes> {
  const res = await request
    .post(`${rootURL}`)
    .set('Authorization', `Bearer ${token}`) // <-- Attached token here
    .send(newRecipe)
  return res.body
}

export async function fetchWeeks() {
  const res = await request.get(`${otherRootURL}`)
  return res.body as WeeklyPlan[]
}

export async function fetchWeek(id: number) {
  const res = await request.get(`${otherRootURL}/${id}`)
  return res.body as WeeklyPlan
}

export async function deleteRecipe(id: number, token: string) {
  await request
    .delete(`${rootURL}/${id}`)
    .set('Authorization', `Bearer ${token}`)
}

export async function deleteWeek(id: number) {
  await request.delete(`${otherRootURL}/${id}`)
}

export async function updateRecipe(
  id: number,
  data: Partial<RecipeData>,
  token: string,
): Promise<Recipes> {
  const res = await request
    .patch(`${rootURL}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
  return res.body
}
