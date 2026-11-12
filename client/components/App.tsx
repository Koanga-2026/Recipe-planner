import { Link, Outlet } from 'react-router'

function App() {
  return (
    <>
      <header className="site-header">
        <div className="masthead">
          <Link className="brand" to="/">
            <span className="brand-kicker">The home chef&apos;s</span>
            <span className="brand-name">Recipe Table</span>
          </Link>
          <p className="tagline">Good food, made at home.</p>
        </div>
        <nav className="menu-nav" aria-label="Main navigation">
          <Link className="menu-link" to="/">
            The Menu
          </Link>
          <Link className="menu-link" to="/#add-recipe">
            Add a Recipe
          </Link>
          <span className="menu-note">Fresh from your kitchen</span>
        </nav>
      </header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App
