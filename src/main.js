import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './Login'
import Signup from './Signup'
import Loginpage from "./Loginpage"
import AuthenticatedRoute from './aauth'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"




const Main = () => (
  <main>
    <Switch >
      <AuthenticatedRoute 
      exact path='/' 
      component={App} 
      onEnter={AuthenticatedRoute}
      />
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/loginpage' component={Loginpage}/>
    </Switch>
  </main>
)

export default Main