const DocumentClient = require('aws-sdk/clients/dynamodb');
const dynamodb = new DocumentClient.DocumentClient();
const bcrypt = require('bcrypt');

const loginUseCase = async ({ nickname, password }) => {
  const dep = loginUseCase.dependencies();

  const { Items } = await dep.dynamodb
    .query({
      TableName: 'users',
      IndexName: 'nickname-gsi',
      KeyConditionExpression: '#nickname = :nickname',
      ExpressionAttributeNames: {
        '#nickname': 'nickname',
      },
      ExpressionAttributeValues: {
        ':nickname': nickname,
      },
      Limit: 1,
    })
    .promise();

  if (!Items) {
    return false;
  }

  const [user] = Items;

  const verified = await bcrypt.compare(password, user.password_hash);
  if (verified) {
    delete user.password_hash;
    return user;
  }
  return false;
};

loginUseCase.dependencies = () => ({
  dynamodb,
});

module.exports = loginUseCase;
