const assert = require('assert');
const {File} = require("../src/parsing");

describe('Checking file parsing', function () {

  it('Should open the file and read it.', function () {
    const file = new File('./test/pages_test/index.vue')
    assert.strictEqual(file.openFile(), undefined);
    assert.deepStrictEqual(file.findTranslations(file.fileTrimmed), [0]);
  });
  it('Should have find occurences of translations', function () {
    const file = new File('./test/pages_test/indexMultiple.vue')
    assert.strictEqual(file.indices.length, 3)
    assert.strictEqual(file.indices[0], 0)
  })

  it('Should extract translation from string based on start index', function () {
    const file = new File('./test/pages_test/indexMultiple.vue')
    assert.strictEqual(file.pullOutTranslation(0, file.fileTrimmed), 'test1.test1')
  })

});
