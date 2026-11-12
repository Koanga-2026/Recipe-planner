import request from 'superagent'
import { Recipes, WeeklyPlan } from '../../models/recipes.ts'

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

export async function fetchWeeks() {
  const res = await request.get(`${otherRootURL}`)
  return res.body as WeeklyPlan[]
}

export async function fetchWeek(id: number) {
  const res = await request.get(`${otherRootURL}/${id}`)
  return res.body as WeeklyPlan
}

export async function deleteRecipe(id: number) {
  await request.delete(`${rootURL}/${id}`)
}

export async function deleteWeek(id: number) {
  await request.delete(`${otherRootURL}/${id}`)
}
