/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
const View = require('./view')
const FileManager = require('./file-manager')
const TextManager = require('./text-manager')

const view = new View()
const fileManager = new FileManager()
const textManager = new TextManager()

async function init() {
  try {
    const userInput = textManager.cleanInput(process.argv.slice(2)[0])

    const routeFilePaths = await fileManager.getRouteFilePaths(userInput)
    if (routeFilePaths.length > 1) await view.askConfirmation(routeFilePaths)

    for (const filePath of routeFilePaths) {
      view.displayGreen(`\n--- ${filePath} --------------------------------`)

      const routeObj = require(`${process.cwd()}/${filePath}`)

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
