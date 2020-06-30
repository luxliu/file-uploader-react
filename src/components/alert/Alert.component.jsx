import React from 'react';

const AlertComponent = ({ closeAlert, message }) => (
  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    {message}
    <button
      className="close"
      data-dismiss="alert"
      aria-label="Close"
      onClick={() => closeAlert()}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export default AlertComponent;
