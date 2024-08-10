class HeaderError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ArgsNotFound extends HeaderError {
    constructor(resource, number, args) {
      super(`The ${resource} in argument ${number} is missing`);
      this.data = { args };
    }
  }
  
  class InternalError extends HeaderError {
    constructor(error) {
      super(error.message);
      this.data = { error };
    }
  }
  
module.exports = {ArgsNotFound, InternalError}