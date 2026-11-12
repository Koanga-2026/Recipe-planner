import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
import Home from './components/Home'
import RecipesDetails from './components/RecipesDetails'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/recipe/:id" element={<RecipesDetails />} />
  </Route>,
)

const router = createBrowserRouter(routes)

export default router
