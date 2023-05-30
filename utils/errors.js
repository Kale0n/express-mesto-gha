const http2 = require('http2');

const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_UNAUTHORIZED,
} = http2.constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

class WrongUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongUserError';
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = { NotFoundError, WrongUserError, AuthorizationError };
