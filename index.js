#!/usr/bin/env node
const {File} = require("./src/parsing");

const fs = require('fs');
const constants = require('./src/constants.js')
const {checkCorrectFile} = require("./src/files");


// region args
// const optionDefinitions = [
//   { name: 'folders', type: String, multiple: true, defaultOption: true },
// ]
// const commandLineArgs = require('command-line-args')
// const options = commandLineArgs(optionDefinitions)
//
// console.log(options)

const translationStructure = {}

const folders = ['pages', 'components']

const traverseThroughDirectory = (path) => {
  const filesInRoot = fs.readdirSync(path)
  filesInRoot.forEach(file => {
    const relativePath = path + '/' + file
    const fileStats = fs.lstatSync(relativePath)
    if (fileStats.isDirectory()) {
      traverseThroughDirectory(relativePath)
    }
    if (fileStats.isFile()) {
      const isCorrectFile = checkCorrectFile(relativePath)
      if (isCorrectFile) {
        console.log('\tScanning file ' + relativePath)
        file = new File(relativePath)
      }
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
  }
  else {
    console.warn('Directory ' + path + ' does not exist. Skipping')
  }
})


