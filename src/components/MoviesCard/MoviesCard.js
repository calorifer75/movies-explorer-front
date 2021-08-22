import './MoviesCard.css';

function MoviesCard(props) {
  function onSaveMovie() {
    props.onSaveMovie(props.id);
  }

  let saveButtonStyle = props.filmSaved
    ? 'movies-card__save_color'
    : 'movies-card__save_white';

  if (props.allowDelete) saveButtonStyle = 'movies-card__save_x';

  let filmTime = parseInt(props.filmTime);
  const h = Math.floor(filmTime / 60);
  const m = filmTime % 60;
  filmTime = `${h}ч. ${m} мин.`;

  return (
    <div className='movies-card'>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        className='movies-card__trailer-link'
        href={props.filmTrailer}
        target='_blank'
        rel='noreferrer'
      ></a>

      <img
        className='movies-card__img'
        src={props.filmSrc}
        alt={props.filmName}
      ></img>

      <div className='movies-card__info-panel'>
        <p className='movies-card__film-name'>{props.filmName}</p>
        <button
          className={`movies-card__save ${saveButtonStyle}`}
          onClick={onSaveMovie}
        ></button>
      </div>

      <p className='movies-card__film-time'>{filmTime}</p>
    </div>
  );
}

export default MoviesCard;
