import React from 'react'
import { Admin, Faculty, LoggedInWrapper, Coordinator } from './views'
import { Router, Route, Switch } from 'react-router-dom'
import { history, Login, Register } from './components'
const AuthRoutes = props => {
  switch (props.level) {
    case 0:
      return <Admin {...props} />
      break
    case 1:
      return <Coordinator {...props} />
      break
    case 2:
      return <Faculty {...props} />
      break
  }
}
export default ({ loggedIn, login, details, redirect }) => (
  <Router history={history}>
    {loggedIn ? (
      <LoggedInWrapper level={details.isAdmin}>
        <AuthRoutes login={login} redirect={redirect} level={details.isAdmin} />
      </LoggedInWrapper>
    ) : (
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/' component={() => <Login login={login} />} />
      </Switch>
    )}
  </Router>
)
