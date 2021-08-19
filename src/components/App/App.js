import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import * as auth from '../../utils/Auth';
import * as api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtecterRoute/ProtectedRoute';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Нажатие кнопки "Вход"
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        err.then((res) => {
          // TODO: отобразить ошибку на форме ввода
          console.log(res);
        });
      });
  }

  // Нажатие кнопки "Регистрация"
  function handleRegister(email, password, name) {
    auth
      .register(email, password, name)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        err.then((res) => {
          // TODO: отобразить ошибку на форме ввода
          console.log(res);
        });
      });
  }

  // Нажатие кнопки "Выход"
  function handleExit() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setLoggedIn(false);
      history.push('/');
    }
  }

  // Проверка токена
  React.useEffect(
    function () {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        auth.checkToken(token).then((res) => {
          setLoggedIn(true);
        });
      }
    },
    [history]
  );

  // Получение UserInfo
  React.useEffect(
    function () {
      if (loggedIn)
        api
          .getUserInfo()
          .then((userInfo) => {
            setCurrentUser(userInfo);
          })
          .catch((err) => console.log(err));
    },
    [loggedIn]
  );

  // Запись профиля на сервер
  function handleUpdateProfile(name, email) {
    api
      .setUserInfo(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        history.goBack();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, loggedIn}}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <ProtectedRoute exact path='/movies' loggedIn={loggedIn}>
            <Movies />
          </ProtectedRoute>
          <ProtectedRoute exact path='/saved-movies' loggedIn={loggedIn}>
            <SavedMovies />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile' loggedIn={loggedIn}>
            <Profile
              onExit={handleExit}
              onUpdateProfile={handleUpdateProfile}
            />
          </ProtectedRoute>
          <Route exact path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Preloader />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
