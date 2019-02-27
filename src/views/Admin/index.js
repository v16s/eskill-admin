import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { StudentRegister, EditTest, CreateTest, QuestionPg } from 'components'
import Dashboard from './Dashboard'
export default ({ login, redirect }) => (
  <Switch>
    <Route path='/studentregister' component={StudentRegister} />
    <Route
      path='/test/:tid'
      component={props => <EditTest {...props.match.params} />}
    />
    <Route path='/createTest' component={CreateTest} />
    <Route
      path='/questionpg'
      component={() => <QuestionPg redirect={redirect} />}
    />
    <Route path='/' component={() => <Dashboard login={login} />} />
  </Switch>
)
