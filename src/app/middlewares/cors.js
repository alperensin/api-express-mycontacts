module.exports = (_request, response, next) => {
  // Wildcard -> Curinga -> *
  // response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
};
