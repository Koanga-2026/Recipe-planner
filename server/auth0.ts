import { auth } from 'express-oauth2-jwt-bearer'

const checkJwt = auth({
  audience: 'Recipes',
  issuerBaseURL: 'https://koanga-chris.au.auth0.com',
})

export default checkJwt
