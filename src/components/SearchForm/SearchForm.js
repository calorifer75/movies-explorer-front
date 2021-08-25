import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  let filmName, filmShort;

  const [inputDisabled, setInputDisabled] = React.useState(false);
  
  if (props.searchMoviesState) {
    filmName = props.searchMoviesState.filmName;
    filmShort = props.searchMoviesState.filmShort;
  } else {
    filmName = props.searchSavedMoviesState.filmName;
    filmShort = props.searchSavedMoviesState.filmShort;
  }
  
  function handleChange(evt) {    
    filmName = evt.target.value;
  }

  function handleCheckBox(checked) {    
    filmShort = checked;
  }

  function onGetMovies(evt) {
    evt.preventDefault();
    setInputDisabled(true);

    props.onGetMovies(filmName, filmShort, setInputDisabled);

    if (props.setSearchMoviesState) {
      props.setSearchMoviesState({ filmName, filmShort });
    } else {
      props.setSearchSavedMoviesState({ filmName, filmShort });
    }
  }

  function validateFilmName() {
    const filmNameInput = document.querySelector('.search-form__film-name');
    if (!filmNameInput.value) {
      filmNameInput.setCustomValidity('Нужно ввести ключевое слово');
    } else {
      filmNameInput.setCustomValidity('');
    }
  }

  return (
    <section className='search-form'>
      <div className='search-form__wrapper'>
        <form
          className='search-form__form'
          name='search-form'
          onSubmit={onGetMovies}
          onLoad={validateFilmName}
        >
          <input
            className='search-form__film-name'
            name='filmName'
            type='text'
            defaultValue={filmName}
            placeholder='Фильм'
            required
            disabled={inputDisabled}
            onChange={handleChange}
            onInvalid={validateFilmName}
            onInput={validateFilmName}
          ></input>
          <button
            className='search-form__submit'
            type='submit'
            disabled={inputDisabled}
          ></button>
          <FilterCheckbox onChange={handleCheckBox} filmShort={filmShort} />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
