#!/usr/bin/env node
const fs = require('fs');
const constants = require('./constants.js')


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

const checkCorrectFile = () => {}

const traverseThroughDirectory = (path) => {
  const filesInRoot = fs.readdirSync(path)
  filesInRoot.forEach(file => {
    const fileStats = fs.lstatSync(path + '/' + file)
    console.log(fileStats.isDirectory(), file)

    if (fileStats.isDirectory()) {
      traverseThroughDirectory(path + '/' + file)
    } else if (fileStats.isDirectory()) {

    }
  })
}

// Read through the directory contents
// Check if file is a folder or a file
// If file, check if it matches the pattern else go a level deeper.
folders.forEach(folder => {
  const path = './' + folder
  if (fs.existsSync(path))
    traverseThroughDirectory(path)
})


