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
import * as auth from '../../utils/Auth';
import * as api from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtecterRoute/ProtectedRoute';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [userMessage, setUserMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [serverErrorMsg, setServerErrorMsg] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [renderMovies, setRenderMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [displayMoreMovies, setDisplayMoreMovies] = React.useState(true);
  const [preloaderActive, setPreloaderActive] = React.useState(false);
  const [preloaderNotFound, setPreloaderNotFound] = React.useState(false);
  const [searchMoviesState, setSearchMoviesState] = React.useState({
    filmName: '',
    filmShort: false,
  });
  const [searchSavedMoviesState, setSearchSavedMoviesState] = React.useState({
    filmName: '',
    filmShort: false,
  });
  const imagesServer = 'https://api.nomoreparties.co';

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
          setServerErrorMsg('Ошибка! ' + res.message);
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
          setServerErrorMsg('Ошибка! ' + res.message);
        });
      });
  }

  // Нажатие кнопки "Выход"
  function handleExit() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('movies');
      localStorage.removeItem('all-movies');
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
        setUserMessage('Сохранение профиля прошло успешно');
      })
      .catch((err) => {
        err.then((res) => {
          setServerErrorMsg('Ошибка! ' + res.message);
        });
      });
  }

  // Заполнение renderMovies при открытии страницы
  function setRenderMoviesFirstTime(f) {
    if (document.documentElement.clientWidth < 768) {
      setRenderMovies(f.slice(0, 5));
    } else if (document.documentElement.clientWidth < 1280) {
      setRenderMovies(f.slice(0, 2));
    } else {
      setRenderMovies(f.slice(0, 4));
    }
  }

  // Фильтрация сохраненных фильмов
  function handleFilterMovies(name, short) {
    const f = savedMovies.map((item) => {
      const nameMatch = item.nameRU.toUpperCase().includes(name.toUpperCase());
      const shortMatch = short ? parseInt(item.duration) <= 40 : true;
      if (nameMatch && shortMatch) {
        item.hidden = false;
      } else {
        item.hidden = true;
      }
      return item;
    });

    setSavedMovies(f);
  }

  // Получение фильмов от сервера
  async function handleGetMovies(name, short) {
    setRenderMovies([]);
    setServerErrorMsg('');
    setPreloaderNotFound(false);
    setPreloaderActive(true);

    let allFilms = [];

    // Если в хранилище уже есть фильмы, забираем отттуда,
    // а если нет - делаем запрос на сервер
    if (localStorage.getItem('all-movies')) {
      allFilms = JSON.parse(localStorage.getItem('all-movies'));
    } else {
      try {
        allFilms = await moviesApi.getMovies();
        localStorage.setItem('all-movies', JSON.stringify(allFilms));
      } catch (error) {
        setPreloaderActive(false);
        setPreloaderNotFound(false);
        setServerErrorMsg(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением ' +
            'или сервер недоступен.Подождите немного и попробуйте ещё раз'
        );
      }
    }

    // Фильтрация полученных фильмов
    const f = allFilms.filter((item) => {
      const nameMatch = item.nameRU.toUpperCase().includes(name.toUpperCase());
      const shortMatch = short ? parseInt(item.duration) <= 40 : true;
      return nameMatch && shortMatch;
    });

    // Дополнение массива нужной информацией
    f.forEach((element) => {
      element.image.url = imagesServer + element.image.url;
      element.image.formats.thumbnail.url =
        imagesServer + element.image.formats.thumbnail.url;

      if (savedMovies.find((savMov) => savMov.id === element.id)) {
        element.saved = true;
      } else element.saved = false;
    });

    setPreloaderActive(false);
    setPreloaderNotFound(f.length === 0);

    localStorage.setItem('movies', JSON.stringify(f));

    setRenderMoviesFirstTime(f);
    setMovies(f);
  }

  // получение фильмов из локального хранилища
  React.useEffect(() => {
    if (loggedIn) {
      const jsonMovies = localStorage.getItem('movies');
      if (jsonMovies) {
        const f = JSON.parse(jsonMovies);
        setMovies(f);
        setRenderMoviesFirstTime(f);
      }
    }
  }, [loggedIn]);

  // Обновление renderMovies при изменении movies
  React.useEffect(() => {
    renderMovies.forEach((renMov) => {
      const mov = movies.find((m) => m.id === renMov.id);
      Object.assign(renMov, mov);
    });
    setRenderMovies([...renderMovies]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  // Получение сохраненных фильмов из своей базы
  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api
      .getSavedMovies()
      .then((res) => {
        res.forEach((element) => {
          element.image = { url: element.image };

          element.trailerLink = element.trailer;
          delete element.trailer;

          element.id = element.movieId;
          delete element.movieId;
        });

        setSavedMovies(res);
      })
      .catch((error) => {
        error.then((res) => {
          setServerErrorMsg('Ошибка! ' + res.message);
        });
      });
  }, [loggedIn]);

  // Сохранение фильма к себе в базу
  async function handleSaveMovie({ movieId }) {
    const savedMovie = savedMovies.find((m) => m.id === movieId);
    if (savedMovie) {
      handleDeleteMovie({ _id: savedMovie._id, movieId: movieId });
      return;
    }

    const movie = movies.find((element) => element.id === movieId);

    const movieToSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image.url,
      trailer: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    try {
      const savedMovie = await api.saveMovie(movieToSave);
      movie.saved = !movie.saved;
      movie._id = savedMovie._id;
      setMovies([...movies]);
      setSavedMovies([...savedMovies, movie]);
      localStorage.setItem('movies', JSON.stringify(movies));
    } catch (error) {
      error.then((res) => {
        setServerErrorMsg('Ошибка! ' + res.message);
      });
    }
  }

  // Удаление фильма из своей базы
  async function handleDeleteMovie({ _id, movieId }) {
    try {
      await api.deleteMovie(_id);
      setSavedMovies(savedMovies.filter((m) => m.id !== movieId));
      const movie = movies.find((m) => m.id === movieId);
      if (movie) {
        movie.saved = false;
        setMovies([...movies]);
        localStorage.setItem('movies', JSON.stringify(movies));
      }
    } catch (error) {
      error.then((res) => {
        setServerErrorMsg('Ошибка! ' + res.message);
      });
    }
  }

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
      value={{
        currentUser,
        loggedIn,
        serverErrorMsg,
        setServerErrorMsg,
        userMessage,
        setUserMessage,
      }}
    >
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <ProtectedRoute exact path='/movies' loggedIn={loggedIn}>
            <Movies
              onGetMovies={handleGetMovies}
              onSaveMovie={handleSaveMovie}
              renderMovies={renderMovies}
              renderMoreMovies={renderMoreMovies}
              displayMoreMovies={displayMoreMovies}
              preloaderActive={preloaderActive}
              preloaderNotFound={preloaderNotFound}
              searchMoviesState={searchMoviesState}
              setSearchMoviesState={setSearchMoviesState}
            />
          </ProtectedRoute>
          <ProtectedRoute exact path='/saved-movies' loggedIn={loggedIn}>
            <SavedMovies
              savedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
              onGetMovies={handleFilterMovies}
              searchSavedMoviesState={searchSavedMoviesState}
              setSearchSavedMoviesState={setSearchSavedMoviesState}
            />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
