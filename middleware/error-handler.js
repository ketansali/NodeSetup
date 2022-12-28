
const errorHandler = async (error, req, res, next) => {
  if (res.headersSent) return next(error)
  const { message, status = 500, statusCode } = error
  const statusTrack = statusCode ? statusCode : status
  return res
    .status(statusTrack)
    .json({ statusCode: statusTrack, message, isSuccess: false })
}

module.exports = errorHandler
