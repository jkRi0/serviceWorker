console.log('App is running!');

// Function to update connection status
function updateConnectionStatus(isOnline) {
  const statusElement = document.getElementById('connection-status');
  
  if (statusElement) {
    statusElement.textContent = `You are currently ${isOnline ? 'online' : 'offline'}`;
    statusElement.className = isOnline ? 'online' : 'offline';
  }
}

// Create a real-time connection monitor
function createConnectionMonitor() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    // Monitor connection changes
    connection.addEventListener('change', () => {
      updateConnectionStatus(navigator.onLine);
    });
  }

  // Monitor online/offline events
  window.addEventListener('online', () => {
    updateConnectionStatus(true);
  });

  window.addEventListener('offline', () => {
    updateConnectionStatus(false);
  });

  // Initial status
  updateConnectionStatus(navigator.onLine);
}

// Start monitoring
createConnectionMonitor();