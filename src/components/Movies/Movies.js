import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesMoreCards from '../MoviesMoreCards/MoviesMoreCards';
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
    allowDelete: false,
  },
  {
    filmSrc: filmTwoSrc,
    filmName: 'В погоне за Бенкси',
    filmTime: '1ч 42м',
    saved: false,
    allowDelete: false,
  },
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: false,
  },
  {
    filmSrc: filmTwoSrc,
    filmName: 'В погоне за Бенкси',
    filmTime: '1ч 42м',
    saved: false,
    allowDelete: false,
  },
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: false,
  },
  {
    filmSrc: filmTwoSrc,
    filmName: 'В погоне за Бенкси',
    filmTime: '1ч 42м',
    saved: false,
    allowDelete: false,
  },
  {
    filmSrc: filmOneSrc,
    filmName: '33 слова о дизайне',
    filmTime: '1ч 42м',
    saved: true,
    allowDelete: false,
  },
  {
    filmSrc: filmTwoSrc,
    filmName: 'В погоне за Бенкси',
    filmTime: '1ч 42м',
    saved: false,
    allowDelete: false,
  },
];

function Movies() {
  return (
    <>
      <Header registerLinkHidden={true} loginLinkHidden={true} />
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <MoviesMoreCards />
      <Footer />
    </>
  );
}

export default Movies;
