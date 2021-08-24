import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__wrapper'>
        <form className='search-form__form' name='search-form'>
          <input
            className='search-form__film-name'
            name='filmName'
            type='text'
            placeholder='Фильм'
          ></input>
          <button className='search-form__submit' type='submit'></button>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
