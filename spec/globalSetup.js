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
  const filePath = req.path.replace(urlReplace, './dist');
  res.sendFile(filePath, options, (err) => {
    if (err) {
      console.error('Express error : ', err);
    }
  });
});

module.exports = () => {
  global.__express__ = app.listen(8080, 'localhost', () => {
    console.log('Express open at port 8080');
  });
};
