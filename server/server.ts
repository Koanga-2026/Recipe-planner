import * as Path from 'node:path'
import recipesRoutes from './routes/routesRecipes.ts'
import weeklyPlanRoutes from './routes/routesWeeks.ts'
import express from 'express'
import recipeRoutes from './routes/recipes'

const server = express()
server.use(express.json())
server.use('/api/v1/recipes', recipesRoutes)
server.use('/api/v1/week', weeklyPlanRoutes)

// ADD YOUR API ROUTES HERE
server.use('/api/v1/recipes', recipeRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
