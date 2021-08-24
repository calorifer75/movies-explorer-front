import './Techs.css';

function Techs() {
  return (
    <section className='techs' id='techs'>
      <div className='techs__wrapper'>
        <h2 className='main-subtitle main-subtitle_underlined'>Технологии</h2>
        <p className='techs__count'>7 технологий</p>
        <p className='techs__paragraph'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <section className='techs__cards'>
          <div className='techs__card'>HTML</div>
          <div className='techs__card'>CSS</div>
          <div className='techs__card'>JS</div>
          <div className='techs__card'>React</div>
          <div className='techs__card'>Git</div>
          <div className='techs__card'>Express.js</div>
          <div className='techs__card'>mongoDB</div>
        </section>
      </div>
    </section>
  );
}

export default Techs;
