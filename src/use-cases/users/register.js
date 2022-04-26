const DocumentClient = require('aws-sdk/clients/dynamodb');
const dynamodb = new DocumentClient.DocumentClient();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 8;
const uuid = require('uuid');

const registerUseCase = async ({ nickname, password }) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const passwordHash = await bcrypt.hash(password, salt);

  const dep = registerUseCase.dependencies();
  const id = uuid.v4();
  await dep.dynamodb
    .put({
      TableName: 'users',
      Item: {
        id,
        nickname,
        password_hash: passwordHash,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    })
    .promise();
  return id;
};

registerUseCase.dependencies = () => ({
  dynamodb,
});

module.exports = registerUseCase;
