import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
  return (    
    <Route path={props.path}>
      {props.loggedIn ? props.children : <Redirect to="/signin"/>}
    </Route>
  )
}

export default ProtectedRoute;