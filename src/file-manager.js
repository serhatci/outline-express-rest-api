const fs = require('fs')

module.exports = class FileManager {
  getRouteFilePaths(userInput) {
    if (!fs.existsSync(userInput)) throw Error(`${userInput} does not exist!`)

    if (/\..*?$/.test(userInput)) return [userInput]

    const jsFiles = this.getJsFilesInFolder(userInput)
    return jsFiles.map(file => `${userInput}/${file}`)
  }

  getJsFilesInFolder(path) {
    const files = fs.readdirSync(path)
    if (!files.length) throw Error('There is no file in the folder!')

    const jsFiles = files.filter(file => /.js$/.test(file))
    if (!jsFiles.length) throw Error('There is no *.js file in the folder!')

    return jsFiles
  }

  getFullPath(filePath) {
    return `${process.cwd()}/${filePath}`
  }
}
