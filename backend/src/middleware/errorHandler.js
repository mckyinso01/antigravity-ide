/**
 * Centralized error handler middleware.
 */
export function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
}
