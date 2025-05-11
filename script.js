console.log('App is running!');

// Function to update connection status
function updateConnectionStatus(isOnline) {
  const statusElement = document.getElementById('connection-status');
  
  if (statusElement) {
    statusElement.textContent = `You are currently ${isOnline ? 'online' : 'offline'}`;
    statusElement.className = isOnline ? 'online' : 'offline';
  }
  console.log(`Connection status updated: ${isOnline ? 'online' : 'offline'}`);
}

// Function to check internet connection
function checkInternetConnection() {
  // Try multiple reliable endpoints
  const endpoints = [
    'https://api.github.com/status',
    'https://www.cloudflare.com/cdn-cgi/trace',
    'https://www.google.com/favicon.ico'
  ];

  // Try each endpoint until one succeeds
  const checkEndpoint = async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log(`Failed to check ${url}:`, error);
      return false;
    }
  };

  // Try all endpoints
  Promise.any(endpoints.map(checkEndpoint))
    .then((result) => {
      updateConnectionStatus(result);
    })
    .catch(() => {
      updateConnectionStatus(false);
    });
}

// Create a real-time connection monitor
function createConnectionMonitor() {
  console.log('Starting connection monitor...');
  
  // Initial check
  checkInternetConnection();
  
  // Check every 5 seconds
  const intervalId = setInterval(checkInternetConnection, 5000);
  
  // Also keep the event listeners for immediate feedback
  window.addEventListener('online', () => {
    console.log('Browser reports online');
    updateConnectionStatus(true);
  });

  window.addEventListener('offline', () => {
    console.log('Browser reports offline');
    updateConnectionStatus(false);
  });

  // Clean up interval when page is unloaded
  window.addEventListener('unload', () => {
    clearInterval(intervalId);
  });
}

// Start monitoring
createConnectionMonitor();