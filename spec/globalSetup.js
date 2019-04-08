import express from 'express';
import 'babel-polyfill';

var urlReplace = '/public/plugins/agenty-flowcharting-panel';
var options = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

module.exports = () => {
  var app = express();

  // app.all('*', (req, res, next) => {
  //   console.log('globalSetup : app.all req.path ', req.path);
  //   next();
  // });

  app.get('*', (req, res) => {
    console.log('globalSetup : app.get req.path ', req.path);
    let filePath = req.path.replace(urlReplace, '../dist');
    res.sendFile(filePath, options, function(err) {
      if (err) {
        next(err);
      } else {
        console.log('globalSetup : app.get sent ', filePath);
      }
    });
  });

  app.listen(80, 'localhost', () => {
    console.log('Open at port 80');
  });

  global.__express__ = app;
};
