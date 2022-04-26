const registerUseCase = require('../../../../use-cases/users/register');
const existsUseCase = require('../../../../use-cases/users/exists');
const requestSchema = require('./request-schema');
const ValidationError = require('../../../errors/validation-error');
const ConflictError = require('../../../errors/conflict');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    throw new ValidationError('Bad Request.');
  }

  const dep = register.dependencies();

  const nicknameOrEmailAlreadExists = await dep.existsUseCase({
    nickname: req.body.nickname,
  });

  if (nicknameOrEmailAlreadExists) {
    throw new ConflictError('Nickname already exists.');
  }

  const [user] = await dep.createUseCase(req.body);
  res.status(StatusCodes.CREATED).send({
    name: user.first_name + ' ' + user.last_name,
    nickname: user.nickname,
    email: user.email,
    id: user.id,
  });
};

register.dependencies = () => ({
  createUseCase: registerUseCase,
  existsUseCase,
});

module.exports = {
  register,
};
