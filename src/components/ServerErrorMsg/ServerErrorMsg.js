import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ServerErrorMsg.css';

function ServerErrorMsg(props) {
  const { serverErrorMsg, userMessage } = React.useContext(CurrentUserContext);

  const className =
    `server-error-msg 
    ${props.centered ? 'server-error-msg_centered ' : ' '}
    ${ serverErrorMsg ? 'server-error-msg_error-color ' : 'server-error-msg_message-color '}`;

  return (
    <p
      className={className}
    >
      {serverErrorMsg ? serverErrorMsg : userMessage}
    </p>
  );
}

export default ServerErrorMsg;
