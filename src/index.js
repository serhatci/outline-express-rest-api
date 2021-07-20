/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
const View = require('./view')
const FileManager = require('./fileManager')
const TextManager = require('./textManager')

const view = new View()
const fileManager = new FileManager()
const textManager = new TextManager()

async function init() {
  try {
    const userInput = textManager.cleanInput(process.argv.slice(2)[0])

    const routeFiles = await fileManager.getJsFilesInFolder(path)
    await view.askConfirmation(routeFiles)

    for (const filePath of routeFilePaths) {
      view.displayGreen(`\n--- ${filePath} --------------------------------`)

      const routeObj = require(`${path}/${file}`)

      routeObj.stack.forEach(endPoint => {
        const routePath = endPoint.route.path
        const routeMethod = endPoint.route.stack[0].method
        const routeFunc = endPoint.route.stack[0].handle

        const summary = textManager.getSummary(routeFunc)

        view.displayYellow(`${routeMethod.toUpperCase()} route to ${routePath}`)
        view.displaySummary(summary)
        view.display('')
      })
    }

    view.stopExecution()
  } catch (err) {
    view.displayError(err)
    view.stopExecution()
  }
}

init()
