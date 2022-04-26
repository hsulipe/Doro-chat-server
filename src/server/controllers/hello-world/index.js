const useCase = require('../../../use-cases/hello-world')

module.exports = (req, res) => {
  res.send(useCase())
}
