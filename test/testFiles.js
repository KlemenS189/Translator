var assert = require('assert')
const { checkCorrectFile } = require('../src/files')
describe('Checking file extensions', function () {
  it('Should return true if extension is .vue', function () {
    assert.strictEqual(checkCorrectFile('./pages/klemen.vue'), true)
  })
  it('Should return false if extension is something else', function () {
    assert.strictEqual(checkCorrectFile('nln.c'), false)
  })
  it('Should return true if extension is .js', function () {
    const result = checkCorrectFile('anlmas.js')
    assert.strictEqual(result, true)
  })
})
