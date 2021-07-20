const View = require('./view')
const FileManager = require('./fileManager')

const view = new View()
const fileManager = new FileManager()
const textManager = new TextManager()

async function getRouteFiles(path) {
  const filesArr = await fileManager.getJsFilesInFolder(path)
  view.displayGreen('\n\nFollowing route file(s) will be examined:')
  view.display(`  ** [${filesArr}]`)
  await view.askForExecution()
  return filesArr
}

view.display(`
This package provides a short summary of your Express rest API.
Before you start, please make sure that you saved & formatted all your route files.

Click CTRL+C for exit
    `)

async function init() {
  try {
    const path = await view.askRoutesFolder()
    fileManager.checkPath(path)

    const filesArr = await getRouteFiles(path)

    // eslint-disable-next-line no-restricted-syntax
    for (const file of filesArr) {
      view.displayGreen(`\n--- ${file} ------------------------------------`)

      const routeObj = require(`${path}/${file}`)

      routeObj.stack.forEach(endPoint => {
        const routePath = endPoint.route.path
        const routeMethod = endPoint.route.stack[0].method
        const routeFunc = endPoint.route.stack[0].handle

        const summary = textManager.getSummary(routeFunc)

        view.display(`${routeMethod.toUpperCase()} route to ${routePath}`)
        view.displaySummary(summary)
        view.display('')
      })
    }

    view.endExecution()
  } catch (err) {
    if (err.name === 'FileSysErr') {
      view.displayError(err.message)
      init()
    } else {
      view.displayError(err)
      view.endExecution()
    }
  }
}

init()
