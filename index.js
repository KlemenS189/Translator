#!/usr/bin/env node

const fs = require('fs')
const set = require('lodash.set')
const get = require('lodash.get')
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')

const { File } = require('./src/parsing')
const { checkCorrectFile } = require('./src/files')

let translationStructure = {}

// region Args parsing
const optionDefinitions = [
  { name: 'file-output', type: String, defaultOption: true },
  { name: 'help', alias: 'h', type: Boolean }
]
const options = commandLineArgs(optionDefinitions)
const sections = [
  {
    header: 'Description',
    content: 'Tool for generating translation files with Nuxt i18n module. It scans all your files ' +
      'for $t() entries and creates an JSON file from them. It will automatically add new entries that aren\'t ' +
      'in the JSON file yet.'
  },
  {
    header: 'Usage',
    content: 'translator fileName'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'file-output',
        typeLabel: '{underline fileName}',
        description: 'The existing translation file in JSON format, that will be updated with non-existing values'
      }
    ]
  }
]
const usage = commandLineUsage(sections)
// endregion

if (options.help === true) {
  console.log(usage)
  process.exit(0)
}
if (options['file-output']) {
  let inputFile
  const fileOptions = {
    encoding: 'utf-8'
  }
  try {
    inputFile = fs.readFileSync(options['file-output'], fileOptions)
  } catch (e) {
    console.warn('File does not exist or cannot be opened.')
    process.exit(-1)
  }
  try {
    translationStructure = JSON.parse(inputFile)
  } catch (e) {
    console.log('Cannot convert string to JSON')
    process.exit(-2)
  }
}

const folders = ['pages', 'components', 'layouts']

const traverseThroughDirectory = (path) => {
  const filesInRoot = fs.readdirSync(path)
  filesInRoot.forEach(file => {
    const relativePath = path + '/' + file
    const fileStats = fs.lstatSync(relativePath)
    if (fileStats.isDirectory()) {
      traverseThroughDirectory(relativePath)
    }
    if (fileStats.isFile() && checkCorrectFile(relativePath)) {
      console.log('\tScanning file ' + relativePath)
      file = new File(relativePath)
      file.translationStrings.forEach(str => {
        if (get(translationStructure, str) === undefined) {
          set(translationStructure, str, '')
        }
      })
    }
  })
}

// Read through the directory contents
// Check if file is a folder or a file
// If file, check if it matches the pattern else go a level deeper.

folders.forEach(folder => {
  const path = './' + folder
  if (fs.existsSync(path)) {
    console.log('Scanning directory ' + path)
    traverseThroughDirectory(path)
  } else {
    console.warn('Directory ' + path + ' does not exist. Skipping')
  }
})

const stringifiedContent = JSON.stringify(translationStructure)

let outputFile = 'translations.json'
if (options['file-output']) {
  outputFile = options['file-output']
}
fs.writeFile(outputFile, stringifiedContent, function (err) {
  if (err) {
    return console.log(`There was an error with writing to file ${outputFile}`)
  }
  if (options['file-output']) { console.log('Created a new file with the updated contents of ' + options['file-output']) } else { console.log('The translations were saved in file translations.json') }
})
