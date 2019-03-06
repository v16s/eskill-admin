import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { EditTestFaculty as EditTest } from 'components'
import Dashboard from './Dashboard'
export default ({ login, redirect }) => (
  <Switch>
    <Route
      path='/test/:tid'
      component={props => <EditTest tid={props.match.params.tid} />}
    />
    <Route path='/' component={() => <Dashboard login={login} />} />
  </Switch>
)
