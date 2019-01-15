import React from 'react';
import { Route, Redirect} from 'react-router-dom'

function AuthenticatedRoute({component : Component, authenticated, ...rest}) {
    return(
      <Route 
        {...rest}
        render={(props) => localStorage.getItem('auth') ==='aa'
            ? <Component {...props} {...rest} />
            : <Redirect to='/loginpage' /> } />
    )
  }


  


  export default (AuthenticatedRoute)