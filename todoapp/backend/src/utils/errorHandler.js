// Formateador estándar de respuestas
export const sendResponse = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Manejador de errores centralizado
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};