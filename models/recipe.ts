export interface Recipe extends RecipeData {
  id: number
}

export interface RecipeData {
  name: string
  description?: string
  instruction?: string
}
