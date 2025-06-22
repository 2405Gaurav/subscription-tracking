const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err); // For debugging

    // Handle Mongoose bad ObjectId error (e.g., wrong _id format)
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new Error(message);
      error.statusCode = 404;
    }

    // Handle MongoDB duplicate key error (usually code 11000)
    if (err.code === 11000) {
      const message = 'Duplicate key found';
      error = new Error(message);
      error.statusCode = 400;
    }

    // Handle Mongoose validation errors (e.g., required fields missing)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      const message = messages.join(', ');
      error = new Error(message);
      error.statusCode = 400;
    }

    // Final response
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error',
    });

  } catch (error) {
    next(error); // Pass any error to global error handler (if chained)
  }
};

export default errorMiddleware;
