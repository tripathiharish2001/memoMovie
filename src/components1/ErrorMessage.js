import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p className="error">
        <span>❌</span>
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
