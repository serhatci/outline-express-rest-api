const fs = require('fs')
const FileManager = require('../src/file-manager')

jest.mock('fs')

describe('Testing FileManager class in file-manager.js', () => {
  let fileManager

  beforeEach(() => {
    fileManager = new FileManager()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Class should have getRouteFilePaths & getJsFilesInFolder methods', () => {
    expect(fileManager.getRouteFilePaths).toBeInstanceOf(Function)
    expect(fileManager.getJsFilesInFolder).toBeInstanceOf(Function)
  })

  it('getRouteFilePaths() should throw error for wrong input', () => {
    fs.existsSync.mockReturnValue(false)
    expect(() => fileManager.getRouteFilePaths('route/trial.j')).toThrow(Error)
  })

  it('getRouteFilePaths() should provide route file path from file input', async () => {
    fs.existsSync.mockReturnValue(true)
    const result = fileManager.getRouteFilePaths('route/trial.js')
    expect(fs.existsSync).toHaveBeenCalledTimes(1)
    expect(result).toEqual(['route/trial.js'])
  })

  it('getRouteFilePaths() should provide route file paths from folder input', async () => {
    fs.existsSync.mockReturnValue(true)
    fileManager.getJsFilesInFolder = jest.fn()
    fileManager.getJsFilesInFolder.mockReturnValue(['trial.js', 'trial2.js'])
    const result = fileManager.getRouteFilePaths('route')
    expect(fs.existsSync).toHaveBeenCalledTimes(1)
    expect(result).toEqual(['route/trial.js', 'route/trial2.js'])
  })

  it('getJsFilesInFolder() should throw error if there is no file in folder', async () => {
    fs.readdirSync.mockReturnValue([])
    expect(() => fileManager.getJsFilesInFolder('trial')).toThrow(Error)
  })

  it('getJsFilesInFolder() should filter out non js files', async () => {
    fs.readdirSync.mockReturnValue(['trial.js', 'non-js.py'])
    expect(fileManager.getJsFilesInFolder('route')).toEqual(['trial.js'])
  })

  it('getJsFilesInFolder() should throw error if no js files in folder', async () => {
    fs.readdirSync.mockReturnValue(['non-js.py'])
    expect(() => fileManager.getJsFilesInFolder('route')).toThrow(Error)

    fs.readdirSync.mockReturnValue([])
    expect(() => fileManager.getJsFilesInFolder('route')).toThrow(Error)
  })

  it('getFullPath() should provide full path of files', async () => {
    process.cwd = jest.fn()
    process.cwd.mockReturnValue('/users/app')
    expect(fileManager.getFullPath('src/routes')).toEqual('/users/app/src/routes')
  })
})
