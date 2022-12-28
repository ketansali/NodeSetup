/**
 * This moddleware return common error if error occurs in routes
 */
const errorResponse = (error, req, res) => {
  return res.json({
    isSuccess: false,
    statusCode: 400,
    message: error.message,
  })
}

module.exports = errorResponse
