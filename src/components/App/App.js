import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/movies'>
          <Movies />
        </Route>
        <Route exact path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Preloader />
    </div>
  );
}

export default App;
