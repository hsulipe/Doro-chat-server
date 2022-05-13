const yup = require('yup');
module.exports = yup.object().shape({
  data: yup.object(),
});
