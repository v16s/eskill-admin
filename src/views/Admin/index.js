import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  FCRegister,
  EditTest,
  CreateTest,
  QuestionPg,
  AddCourse
} from 'components'
import Dashboard from './Dashboard'
export default ({ login, redirect }) => (
  <Switch>
    <Route path='/register' component={FCRegister} />
    <Route
      path='/test/:branch/:course/:tid'
      component={props => <EditTest {...props.match.params} />}
    />
    <Route path='/createTest' component={CreateTest} />
    <Route path='/addCourse' component={AddCourse} />
    <Route
      path='/questionpg'
      component={() => <QuestionPg redirect={redirect} />}
    />
    <Route path='/' component={() => <Dashboard login={login} />} />
  </Switch>
)
