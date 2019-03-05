import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AddQuestion } from 'components'
export default ({ login, redirect }) => (
  <Switch>
    <Route path='/' component={() => <AddQuestion/>} />
  </Switch>
)
