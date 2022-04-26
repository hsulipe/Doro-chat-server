const DocumentClient = require('aws-sdk/clients/dynamodb');
const dynamodb = new DocumentClient.DocumentClient();

const existsUseCase = async ({ nickname }) => {
  const dep = existsUseCase.dependencies();
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

  return Items && Items.length > 0;
};

existsUseCase.dependencies = () => ({
  dynamodb,
});

module.exports = existsUseCase;
