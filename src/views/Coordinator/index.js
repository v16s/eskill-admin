import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AddQuestion, ShowQuestions } from 'components'

export default ({ login, redirect }) => (
  <Switch>
    <Route exact path='/' component={() => <AddQuestion />} />
    <Route path='/showquestions' component={() => <ShowQuestions />} />
  </Switch>
)
