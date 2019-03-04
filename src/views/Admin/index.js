import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { FCRegister, EditTest, CreateTest, QuestionPg,AddCourse } from 'components'
import Dashboard from './Dashboard'
export default ({ login, redirect }) => (
  <Switch>
    <Route path='/register' component={FCRegister} />
    <Route
      path='/test/:tid'
      component={props => <EditTest tid={props.match.params.tid} />}
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
