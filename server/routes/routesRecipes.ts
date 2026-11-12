import express from 'express'
import * as db from '../db/recipes'
import checkJwt from '../auth0'

const router = express.Router()

// GET /api/v1/recipes (Public)
router.get('/', async (req, res) => {
  try {
    const recipes = await db.getRecipes()
    res.json(recipes)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/recipes/:id (Public)
router.get('/:id', async (req, res) => {
  try {
    const recipe = await db.getRecipeById(Number(req.params.id))
    if (!recipe) {
      res.sendStatus(404)
      return
    }
    res.json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/recipes (PROTECTED with checkJwt)
router.post('/', checkJwt, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send('Name is required')
      return
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

// PATCH /api/v1/recipes/:id (PROTECTED with checkJwt)
router.patch('/:id', checkJwt, async (req, res) => {
  try {
    const recipe = await db.updateRecipe(Number(req.params.id), req.body)

    if (!recipe) {
      res.status(404).send('No recipe found')
      return
    }

    res.json(recipe)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    res.status(500).send('Something went wrong')
  }
})

// DELETE /api/v1/recipes/:id (PROTECTED with checkJwt)
router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const count = await db.deleteRecipe(Number(req.params.id))
    if (!count) {
      res.sendStatus(404)
      return
    }
    res.json(count)
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
