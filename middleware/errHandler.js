import chalk from '../lib/chalk.js';

const errHandler = (err, req, res, next) => {
  chalk('red', err);
  return res.status(err.statusCode || 500).json({ error: err.message });
};

export default errHandler;