// services/notificationService.js
let globalNotificationCallback = null;

// Register the callback from Header component
export const registerNotification = (callback) => {
  globalNotificationCallback = callback;
};

// Trigger notification from anywhere
export const triggerNotification = (message, severity = 'success') => {
  if (globalNotificationCallback) {
    globalNotificationCallback({ open: true, message, severity });
  } else {
    console.warn('Notification system not initialized yet');
  }
};
