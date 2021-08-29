import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { checkToken } from '../../utils/Auth';

function ProtectedRoute(props) {
  const history = useHistory();

  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    checkToken(token)
      .catch(() => history.push('/'));
  } else {
    history.push('/');
  }

  return (
    <Route path={props.path}>
      {props.children}
    </Route>
  );
}

export default ProtectedRoute;
