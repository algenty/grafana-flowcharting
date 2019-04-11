import express from 'express';
import 'babel-polyfill';

var urlReplace = '/public/plugins/agenty-flowcharting-panel';
var options = {
  root: __dirname + '/..',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

var app = express();
app.get('*', (req, res) => {
  // console.log('globalSetup : app.get req.path ', req.path);
  let filePath = req.path.replace(urlReplace, './dist');
  res.sendFile(filePath, options, function(err) {
    if (err) {
      console.error('Express error : ', err);
    }
  });
});

module.exports = () => {
  global.__express__ = app.listen(80, 'localhost', () => {
    console.log('Express open at port 80');
  });
};
