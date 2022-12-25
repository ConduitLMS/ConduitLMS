import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LoginPage = () => {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <h1>LoginPage</h1>

      {isAuthenticated && <p>Logged in as {currentUser.email}</p>}
      {!isAuthenticated && <p>Logged Out</p>}
      <button onClick={logIn}>Log In</button>
      <button onClick={logOut}>Log Out</button>
      <p>
        Find me in <code>./web/src/pages/LoginPage/LoginPage.tsx</code>
      </p>
      <p>
        My default route is named <code>login</code>, link to me with `
        <Link to={routes.login()}>Login</Link>`
      </p>
    </>
  )
}

export default LoginPage
