import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ServerErrorMsg.css';

function ServerErrorMsg(props) {
  const { serverErrorMsg } = React.useContext(CurrentUserContext);

  return (
    <p
      className={`server-error-msg ${
        props.centered ? 'server-error-msg_centered' : ''
      }`}
    >
      {serverErrorMsg}
    </p>
  );
}

export default ServerErrorMsg;
