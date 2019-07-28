const constants = require('./constants.js')

const checkCorrectFile = (fileName) => {
  return constants.mainFileExtensions.test(fileName)
}

module.exports = {
  checkCorrectFile: checkCorrectFile
}
