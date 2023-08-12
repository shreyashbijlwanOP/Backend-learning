const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  let msg = error.message;

  if (error.name == "CastError" && error.kind == "ObjectId") {
    statusCode = 400;
    msg = "resource not Found";
  }

  res.status(statusCode).json({
    msg,
    stack: process.env.NODE_ENV == "production" ? null : error.stack,
  });
};

export { notFound, errorHandler };
