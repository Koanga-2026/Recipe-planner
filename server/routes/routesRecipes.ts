import express from 'express'
import * as db from '../db/recipes'

const router = express.Router()
//get'/api/v1/recipes'
router.get('/', async (req, res) => {
  try {
    const recipes = await db.getRecipes()
    res.json(recipes)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  }
})

//get'/api/v1/recipes/id'
router.get('/:id', async (req, res) => {
  try {
    const recipe = await db.getRecipeById(Number(req.params.id))
    if (!recipe) {
      res.sendStatus(404)
    }
    res.json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
