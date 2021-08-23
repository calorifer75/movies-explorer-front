import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  props.savedMovies.forEach((element) => {
    element.allowDelete = true;
  });

  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList
        renderMovies={props.savedMovies}
        onLikeButtonClick={props.onDeleteMovie}
      />
      <div className='saved-movies__divider'></div>
      <Footer />
    </>
  );
}

export default SavedMovies;
