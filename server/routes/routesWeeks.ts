import express from 'express'
import * as db from '../db/recipes'

const router = express.Router()

//get'/api/v1/week'
router.get('/', async (req, res) => {
  try {
    const weeks = await db.getWeeks()
    res.json(weeks)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  }
})

//get'/api/v1/week/id'
router.get('/:id', async (req, res) => {
  try {
    const week = await db.getWeekById(Number(req.params.id))
    if (!week) {
      res.sendStatus(404)
    }
    res.json(week)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  }
})

//delete'/api/v1/week/id'
router.delete('/:id', async (req, res) => {
  try {
    const count = await db.deleteWeek(Number(req.params.id))
    if (!count) {
      res.sendStatus(404)
    }
    res.json(count)
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
