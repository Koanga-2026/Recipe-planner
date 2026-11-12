import db from './connection'
import { Recipes, WeeklyPlan } from '../../models/recipes'
import { RecipeData } from '../../models/recipe'

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

export async function getRecipeById(id: number) {
  const result = await db('recipes')
    .select(...columns)
    .where({ id })
    .first()
  console.log(result)
  return result as Recipes
}

export async function addRecipe(data: RecipeData) {
  const [recipe] = await db('recipes')
    .insert({
      name: data.name,
      description: data.description,
      instruction: data.instruction,
    })
    .returning(columns)

  return recipe as Recipes
}

export async function updateRecipe(
  id: number,
  data: Partial<RecipeData>,
): Promise<Recipes | undefined> {
  const [recipe] = await db('recipes')
    .where({ id })
    .update({
      name: data.name,
      description: data.description,
      instruction: data.instruction,
    })
    .returning(columns)

  return recipe as Recipes | undefined
}

export async function getWeeks() {
  const result = await db('weekly_plan').select(...otherColumns)
  console.log(result)
  return result as WeeklyPlan[]
}

export async function getWeekById(id: number) {
  const result = await db('weekly_plan')
    .select(...otherColumns)
    .where({ id })
    .first()
  console.log(result)
  return result as WeeklyPlan
}

export async function deleteRecipe(id: number) {
  return await db('recipes').where({ id }).delete()
}

export async function deleteWeek(id: number) {
  return await db('weekly_plan').where({ id }).delete()
}
