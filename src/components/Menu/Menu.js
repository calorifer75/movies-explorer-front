import './Menu.css';
import Navigation from '../Navigation/Navigation';

function Menu(props) {
  return (
    <div className={`menu ${props.isOpen ? 'menu_open' : ''}`}>
      <main className='menu__main'>
        <div className='menu__wrapper'>
          <div className='menu__close'>
            <button
              type='button'
              onClick={props.onMenuCloseClick}
            ></button>
          </div>
          <Navigation onMenuCloseClick={props.onMenuCloseClick}/>
        </div>        
      </main>
    </div>
  );
}

export default Menu;
