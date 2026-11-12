import { Outlet } from 'react-router'

function App() {
  return (
    <>
      <header className="header"></header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App
