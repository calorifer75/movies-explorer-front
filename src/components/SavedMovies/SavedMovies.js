import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

// временно, на период верстки
import filmOneSrc from '../../images/film-1.jpg';
import filmTwoSrc from '../../images/film-2.jpg';
const cardList = [
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: true,
  },
  {
    filmSrc: filmTwoSrc,
    filmName: 'В погоне за Бенкси',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: true,
  },
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: true,
  },
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: true,
  },
  {
    filmSrc: filmTwoSrc,
    filmName: 'В погоне за Бенкси',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: true,
  },
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: true,
  },
];

function SavedMovies() {
  return (
    <>
      <Header registerLinkHidden={true} loginLinkHidden={true}/>
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <div className='saved-movies__divider'></div>
      <Footer />
    </>
  );
}

export default SavedMovies;
