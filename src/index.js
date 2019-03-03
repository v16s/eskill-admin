import React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { history, LoadScreen } from './components'
import axios from 'axios'
class Root extends React.Component {
  state = { loggedIn: undefined, details: {} }
  componentWillMount () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    )
    axios
      .get('http://localhost:3000/api/validate/admin')
      .then(res => {
        this.setState({ loggedIn: true, details: res.data.user })
      })
      .catch(error => {
        this.setState({ loggedIn: false })
      })
  }
  login = details => {
    this.setState({ loggedIn: true, details })
  }

  redirect = route => {
    history.push(route)
  }
  render () {
    return this.state.loggedIn !== undefined ? (
      <Router login={this.login} redirect={this.redirect} {...this.state} />
    ) : (
      <LoadScreen />
    )
  }
}
render(<Root />, document.getElementById('root'))
