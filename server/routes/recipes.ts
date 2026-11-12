import express from 'express'
import * as db from '../db/recipes'

const router = express.Router()

//post
//api/v1/recipes
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send('Name is required')
    }
    const recipe = await db.addRecipe(req.body)
    res.status(201).json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

export default router
