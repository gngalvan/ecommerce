export default class CustomError extends Error {
    constructor(name,message, cause, code = 1) {
      super(name,message);
      this.cause = cause;
      this.code = code;
    }
  }
  