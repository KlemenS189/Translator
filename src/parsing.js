const fs = require('fs');

class File {
  constructor(fileName) {
    // Instance variables
    this.fileName = fileName
    this.file = ''
    this.fileTrimmed = ''
    this.indices = []

    // Functions to execute
    this.openFile()
    this.indices = this.findTranslations(this.fileTrimmed)
    this.indices.forEach(idx => {
      this.pullOutTranslation(idx, this.fileTrimmed)
    })
  }

  /**
   * Function that opens a file and trims all new lines, carriage returns and tabs (\n, \r and \t)
   */
  openFile() {
    const options = {
      encoding: 'utf-8'
    }
    this.file = fs.readFileSync(this.fileName, options)
    this.fileTrimmed = this.file.replace(/[\n\r\t]/g, '')
  }

  /**
   * Function that finds all occurrences of translation entry based on regex
   * @param trimmedFile
   * @returns {Array}
   */
  findTranslations(trimmedFile) {
    const regex = /\$t\('[a-zA-Z0-9.]+'\)/g
    let result = ''
    let indices = []
    while ( (result = regex.exec(trimmedFile)) ) {
      indices.push(result.index);
    }
    return indices
  }

  /**
   * Pulls the translations from the file. If the entry is $t('test.test') is found, the function will return 'test.test'
   * @param index
   * @param str
   */
  pullOutTranslation(index, str) {
    const start = index + 3
    const end = str.indexOf('\'', start + 1)
    return str.substring(start + 1, end)
  }
}

module.exports = {
  File
};
