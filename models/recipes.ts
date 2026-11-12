export interface WeeklyPlan {
  id: number
  weekStart: string
}

export interface Recipes {
  id: number
  name: string
  description: string
  instruction: string
  weeklyPlanId: number
  plannedDay: string
  mealType: string
}
