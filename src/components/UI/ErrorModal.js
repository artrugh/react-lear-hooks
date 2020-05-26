import React, { memo, useEffect } from 'react';

import './ErrorModal.css';

const ErrorModal = memo(props => {
  
  console.log('RENDERING ERRORMODAL BEFORE');
  useEffect(() => {
    console.log('RENDERING ERRORMODAL');
  });

  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
