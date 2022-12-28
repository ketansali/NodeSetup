'use strict'

const WHITE_LIST = ['http://localhost:4200', 'http://localhost:4200/']

module.exports = {
  // list of domaines have access
  WHITE_LIST: WHITE_LIST,

  // status codes
  SUCCESS_CODE: 200,
  ALLREADY_EXIST: 409,
  CREATED: 201,
  ERROR_CODE: 400,
  AUTH_CODE: 401,
  SERVICE_UNAVAILABLE: 503,
  NO_CONTENT: 204,
}
