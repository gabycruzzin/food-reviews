const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

let reviews = [];

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // parse request body
  app.use(express.json());

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  // Answer API requests.
  app.get('/health', function (request, response) {
    response.set('Content-Type', 'application/json');
    response.send('{"message":"Firing on all cylinders!"}');
  });

  // Answer API requests.
  app.get('/getReviews', function (request, response) {
    console.log('getting reviews');
    response.json({requestBody: reviews});
  })

  // Answer API requests.
  app.post('/addReview', function (request, response) {
    console.log('adding a review');
    reviews.push(request.body);
    response.json({requestBody: reviews});
  })

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
