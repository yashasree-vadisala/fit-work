import multer from "multer";

// Wraps every async route handler so thrown errors reach errorHandler
// instead of crashing the process or hanging the request.
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error("[error]", err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }

  if (err.message?.includes("Unsupported file type")) {
    return res.status(400).json({ error: err.message });
  }

  const status = err.status || 500;
  const message =
    status === 500 ? "Something went wrong while processing your request." : err.message;

  res.status(status).json({ error: message });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}
