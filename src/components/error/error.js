import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';

import './error.css';

const Error = ({ error, addIsOnline, addError }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  if (error) {
    addError();
    return (
      <Alert
        message="Error"
        description="Unfortunately the server is currently unavailable."
        type="error"
        showIcon
        className="error error_message"
      />
    );
  }

  if (!isOnline) {
    addIsOnline();
    return (
      <Alert
        message="Warning"
        description="There is no network connection."
        type="warning"
        className="error warning_message"
        showIcon
      />
    );
  }
};

export default Error;
