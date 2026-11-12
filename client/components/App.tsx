import { Outlet } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0()

  return (
    <>
      <header className="header">
        {!isLoading &&
          (isAuthenticated ? (
            <>
              <p>Hello {user?.name}</p>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          ))}
      </header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App
