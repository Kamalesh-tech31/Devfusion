const { ERROR_MESSAGES } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (err.message.includes('duplicate key')) {
    return res.status(400).json({ error: 'Duplicate entry detected' });
  }

  res.status(err.status || 500).json({
    error: err.message || ERROR_MESSAGES.INTERNAL_ERROR,
  });
};

module.exports = errorHandler;
