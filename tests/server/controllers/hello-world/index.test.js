const helloWorldController = require('../../../../src/server/controllers/hello-world')
describe('Controllers - Hello World', () => {
  it('should return hello world', () => {
    const req = {}
    const res = {
      send: jest.fn()
    }
    helloWorldController(req, res)

    expect(res.send).toHaveBeenNthCalledWith(1, "Hello World")
  })
})
