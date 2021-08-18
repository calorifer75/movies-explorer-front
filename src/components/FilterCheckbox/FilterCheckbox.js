import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className='filter-checkbox'>
      <input
        id='short-meters'
        type='checkbox'
        defaultValue='false'
      />
      <span className='filter-checkbox__box-green'>
        <span className='filter-checkbox__box-white'></span>
      </span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
