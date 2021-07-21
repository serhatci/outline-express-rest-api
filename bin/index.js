#! /usr/bin/env node

/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */

const View = require('../src/view')
const FileManager = require('../src/file-manager')
const TextManager = require('../src/text-manager')

const view = new View()
const fileManager = new FileManager()
const textManager = new TextManager()

async function init() {
  try {
    const userInput = textManager.cleanInput(process.argv.slice(2)[0])

    const routeFilePaths = await fileManager.getRouteFilePaths(userInput)
    if (routeFilePaths.length > 1) await view.displayTestedFiles(routeFilePaths)

    routeFilePaths.forEach(filePath => {
      const fullPath = fileManager.getFullPath(filePath)
      const routeObj = require(fullPath)
      const results = textManager.outlineRouteObj(routeObj)
      view.displayResults(results, filePath)
    })
  } catch (err) {
    view.displayError(err)
  }
}

init()

module.exports = init
