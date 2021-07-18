const fs = require('fs')

module.exports = class FileManager {
  checkPath(path) {
    const result = fs.existsSync(path)
    if (!result) {
      const err = new Error('Directory does not exist!')
      err.name = 'FileSysErr'
      throw err
    }
  }

  getJsFilesInFolder(path) {
    const files = fs.readdirSync(path)
    if (!files.length) {
      const err = new Error('There is no file in the folder!')
      err.name = 'FileSysErr'
      throw err
    }

    const jsFiles = files.filter(file => /.js$/.test(file))
    if (!jsFiles.length) {
      const err = new Error('There is no *.js file in the folder!')
      err.name = 'FileSysErr'
      throw err
    }

    return jsFiles
  }

  readFileContent(path, file) {
    const text = fs.readFileSync(`${path}/${file}`, 'utf-8')
    if (!text.length) {
      const err = new Error(`Reading content of ${file} was failed!`)
      err.name = 'FileReadErr'
      throw err
    }
    return text
  }
}
