const constants = require('./constants.js')

checkCorrectFile = (fileName) => {
  return constants.mainFileExtensions.test(fileName)
}


module.exports = {
  checkCorrectFile: checkCorrectFile
}
