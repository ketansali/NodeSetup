const successResponse = (res, extraParams = null) => {
  const resObject = {
    isSuccess: true,
    statusCode: 200,
  }
  appendExtraData(resObject, extraParams)
  return res.json(resObject)
}

const notFoundResponse = (res, extraParams = null) => {
  const resObject = {
    isSuccess: false,
    statusCode: 404,
  }
  appendExtraData(resObject, extraParams)
  return res.json(resObject)
}

const badRequestResponse = (res, extraParams = null) => {
  const resObject = {
    isSuccess: false,
    statusCode: 400,
  }
  appendExtraData(resObject, extraParams)
  return res.json(resObject)
}

const appendExtraData = (resObject, extraParams = null) => {
  if (extraParams)
    Object.keys(extraParams).map((x) => (resObject[x] = extraParams[x]))
}

module.exports = {
  successResponse: successResponse,
  notFoundResponse: notFoundResponse,
  badRequestResponse: badRequestResponse,
}
