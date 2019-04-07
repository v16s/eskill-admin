import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { EditTestFaculty as EditTest, Report } from 'components'
import Dashboard from './Dashboard'
export default ({ login, redirect }) => (
  <Switch>
    <Route
      path='/test/:branch/:course/:tid/report'
      component={props => <Report {...props.match.params} />}
    />
    <Route
      path='/test/:branch/:course/:tid'
      component={props => <EditTest {...props.match.params} />}
    />

    <Route path='/' component={() => <Dashboard login={login} />} />
  </Switch>
)
