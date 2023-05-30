const http2 = require('http2');

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CONFLICT, // 409
} = http2.constants;

// eslint-disable-next-line no-unused-vars
module.exports.errorsHandler = ((err, req, res, next) => {
  let statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
  let message;
  if (err.code === 11000) {
    statusCode = HTTP_STATUS_CONFLICT;
    message = 'Такой email уже зарегестрирован';
  } else if (err.name === 'CastError') {
    statusCode = HTTP_STATUS_BAD_REQUEST;
    message = 'Некорректно введенные данные';
  } else {
    if (err.statusCode) {
      statusCode = err.statusCode;
    }
    message = err.message;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
});
