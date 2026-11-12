import db from './connection'
import { Recipes, WeeklyPlan } from '../../models/recipes'

const columns = [
  'id',
  'name',
  'description',
  'instruction',
  'weekly_plan_id as weeklyPlanId',
  'planned_day as plannedDay',
  'meal_type as mealType',
]

const otherColumns = ['id', 'week_start as weekStart']

export async function getRecipes() {
  const result = await db('recipes').select(...columns)
  console.log(result)
  return result as Recipes[]
}

export async function getRecipeById(id) {
  const result = await db('recipes')
    .select(...columns)
    .where({ id })
    .first()
  console.log(result)
  return result as Recipes
}

export async function getWeeks() {
  const result = await db('weekly_plan').select(...otherColumns)
  console.log(result)
  return result as WeeklyPlan[]
}

export async function getWeekById(id) {
  const result = await db('weekly_plan')
    .select(...otherColumns)
    .where({ id })
    .first()
  console.log(result)
  return result as WeeklyPlan
}
