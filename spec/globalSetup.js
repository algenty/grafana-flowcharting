import express from 'express';
import 'babel-polyfill';

const urlReplace = '/public/plugins/agenty-flowcharting-panel';
const options = {
  root: `${__dirname}/..`,
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true,
  },
};

const app = express();
app.get('*', (req, res) => {
  // console.log('globalSetup : app.get req.path ', req.path);
  const filePath = req.path.replace(urlReplace, './dist');
  res.sendFile(filePath, options, (err) => {
    if (err) {
      console.error('Express error : ', err);
    }
  });
});

module.exports = () => {
  // eslint-disable-next-line no-underscore-dangle
  global.__express__ = app.listen(80, 'localhost', () => {
    // eslint-disable-next-line no-console
    console.log('Express open at port 80');
  });
};
