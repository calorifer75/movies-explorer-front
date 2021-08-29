import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMoreCards from '../MoviesMoreCards/MoviesMoreCards';
import Footer from '../Footer/Footer';

function Movies(props) {
  props.renderMovies.forEach(element => {
    element.allowDelete = false;
  });

  return (
    <>
      <Header />
      <SearchForm
        onGetMovies={props.onGetMovies}
        searchMoviesState={props.searchMoviesState}
        setSearchMoviesState={props.setSearchMoviesState}
      />
      <MoviesCardList
        onLikeButtonClick={props.onSaveMovie}
        renderMovies={props.renderMovies}
        preloaderActive={props.preloaderActive}
        preloaderNotFound={props.preloaderNotFound}
      />
      <MoviesMoreCards
        renderMoreMovies={props.renderMoreMovies}
        displayMoreMovies={props.displayMoreMovies}        
      />
      <Footer />
    </>
  );
}

export default Movies;
