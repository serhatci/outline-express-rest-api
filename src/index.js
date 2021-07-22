/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */

const Terminal = require('./terminal')
const FileManager = require('./file-manager')
const TextManager = require('./text-manager')

const terminal = new Terminal()
const fileManager = new FileManager()
const textManager = new TextManager()

async function init() {
  try {
    const userInput = textManager.cleanInput(process.argv.slice(2)[0])

    const routeFilePaths = await fileManager.getRouteFilePaths(userInput)
    if (routeFilePaths.length > 1) await terminal.displayTestedFiles(routeFilePaths)

    routeFilePaths.forEach(filePath => {
      const fullPath = fileManager.getFullPath(filePath)
      const routeObj = require(fullPath)
      const results = textManager.outlineRouteObj(routeObj)

      const filename = textManager.getFilename(filePath)
      terminal.displayResults(results, filename)
    })
  } catch (err) {
    terminal.displayError(err)
  }
}

module.exports = init
