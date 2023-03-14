module.exports = (request, response, next) => {
  const allowedOrigins = [
    'http://192.168.50.102:3000',
    'http://localhost:3000',
  ];

  const origin = request.header('origin');

  const isAllowed = allowedOrigins.includes(origin);

  // Wildcard -> Curinga -> *
  if (isAllowed) {
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // response.setHeader('Access-Control-Allow-Origin', 'http://192.168.50.102:3000');
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }

  next();
};
