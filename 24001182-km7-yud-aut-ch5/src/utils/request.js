class NotFoundError extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super("Data is Not Found!");
    }
    this.status = 404;
  }
}

class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super("Unauthorized!");
    }
    this.status = 401;
  }
}

class InternalServerError extends Error {
  constructor(errors) {
    super("Internal Server Error");
    this.status = 500;
    this.errors = errors;
  }
}

class Forbidden extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super("Forbidden!");
    }
    this.status = 403;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  Unauthorized,
  Forbidden,
};
