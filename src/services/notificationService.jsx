// services/notificationService.js
import { useState } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const hideNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};

// Optional: Toast component
export const NotificationToast = ({ notification, onClose }) => {
  if (!notification.open) return null;

  return (
    <Alert 
      severity={notification.severity}
      sx={{ 
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        minWidth: 300
      }}
      onClose={onClose}
    >
      {notification.message}
    </Alert>
  );
};