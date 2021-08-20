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
import * as moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtecterRoute/ProtectedRoute';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [serverErrorMsg, setServerErrorMsg] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [renderMovies, setRenderMovies] = React.useState([]);
  const [displayMoreMovies, setDisplayMoreMovies] = React.useState(true);

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
          if (res.validation) {
            setServerErrorMsg(`Ошибка: ${res.validation.body.message}`);
          } else {
            setServerErrorMsg(res.message);
          }
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
          if (res.validation) {
            setServerErrorMsg(`Ошибка: ${res.validation.body.message}`);
          } else {
            setServerErrorMsg(res.message);
          }
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
      .catch((err) => {
        err.then((res) => {
          if (res.validation) {
            setServerErrorMsg(`Ошибка: ${res.validation.body.message}`);
          } else {
            setServerErrorMsg(res.message);
          }
        });
      });
  }

  // Получение фильмов
  function handleGetMovies(name) {
    moviesApi
      .getMovies()
      .then((res) => {
        const f = res.filter((item) => {
          return item.nameRU.toUpperCase().includes(name.toUpperCase());
        });
        localStorage.setItem('movies', JSON.stringify(f));
        setMovies(f);          
      })
      .catch((err) => {
        setServerErrorMsg(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением ' +
            'или сервер недоступен.Подождите немного и попробуйте ещё раз'
        );
      });
  }

  // Отрисовка фильмов
  React.useEffect(() => {
    if (document.documentElement.clientWidth < 768) {
      setRenderMovies(movies.slice(0, 5));
    } else if (document.documentElement.clientWidth < 1280) {
      setRenderMovies(movies.slice(0, 2));
    } else {
      setRenderMovies(movies.slice(0, 4));
    }
  }, [movies]);

  // Отрисовка внопки "Еще"
  React.useEffect(() => {
    if (movies.length === renderMovies.length) {
      setDisplayMoreMovies(false);
    } else setDisplayMoreMovies(true);
  }, [movies, renderMovies]);

  // Кнопка "Еще" отрисовывает еще фильмов
  function renderMoreMovies() {
    if (movies.length === renderMovies.length) {
      return;
    }

    const length = renderMovies.length;

    if (document.documentElement.clientWidth < 768) {
      setRenderMovies([...renderMovies, ...movies.slice(length, length + 5)]);
    } else if (document.documentElement.clientWidth < 1280) {
      setRenderMovies([...renderMovies, ...movies.slice(length, length + 2)]);
    } else {
      setRenderMovies([...renderMovies, ...movies.slice(length, length + 4)]);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, loggedIn, serverErrorMsg, setServerErrorMsg }}
    >
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <ProtectedRoute exact path='/movies' loggedIn={loggedIn}>
            <Movies
              onGetMovies={handleGetMovies}
              renderMovies={renderMovies}
              renderMoreMovies={renderMoreMovies}
              displayMoreMovies={displayMoreMovies}
            />
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
