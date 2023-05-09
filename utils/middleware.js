const logger = (req, resp, next) => {
  console.log('Method', req.method)
  console.log('Path', req.path)
  console.log('Body', req.body)
  console.log('-------------')
  next()
}

const handleError = (error, req, resp, next) => {
  if (error.name === 'CastError') {
    return resp.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { logger, unknownEndpoint, handleError }
