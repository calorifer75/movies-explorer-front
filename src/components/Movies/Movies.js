import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMoreCards from '../MoviesMoreCards/MoviesMoreCards';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header />
      <SearchForm onGetMovies={props.onGetMovies} />
      <MoviesCardList renderMovies={props.renderMovies} />
      <MoviesMoreCards
        renderMoreMovies={props.renderMoreMovies}
        displayMoreMovies={props.displayMoreMovies}
      />
      <Footer />
    </>
  );
}

export default Movies;
