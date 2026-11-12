import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'
import router from './router'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="koanga-chris.au.auth0.com"
      clientId="yZ9FVdBH0n30XfKvPplrAdwbndVlocfV"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'Recipes',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
