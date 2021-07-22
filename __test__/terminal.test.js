/* eslint-disable global-require */
/* eslint-disable no-console */
const Terminal = require('../src/terminal')

describe('Testing Terminal class in view.js', () => {
  let view

  beforeEach(() => {
    view = new Terminal()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Class should have specific properties', () => {
    expect(Terminal).toHaveProperty('white')
    expect(Terminal).toHaveProperty('green')
    expect(Terminal).toHaveProperty('red')
    expect(Terminal).toHaveProperty('yellow')
  })

  it('Class should have specific methods', () => {
    expect(view.display).toBeInstanceOf(Function)
    expect(view.displayGreen).toBeInstanceOf(Function)
    expect(view.displayYellow).toBeInstanceOf(Function)
    expect(view.displayError).toBeInstanceOf(Function)
    expect(view.displaySummary).toBeInstanceOf(Function)
    expect(view.displayTestedFiles).toBeInstanceOf(Function)
  })
  it('Class color properties should match with Terminal color references', () => {
    expect(Terminal.white).toBe('\x1b[0m')
    expect(Terminal.red).toBe('\x1b[31m')
    expect(Terminal.green).toBe('\x1b[32m')
    expect(Terminal.yellow).toBe('\x1b[33m')
  })

  it('display() should log a message', () => {
    console.log = jest.fn()
    view.display('hello')
    expect(console.log).toHaveBeenCalledWith('hello')
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  it('displayGreen() should log a green coloured message and reset again to white', () => {
    console.log = jest.fn()
    view.displayGreen('hello')
    expect(console.log).toHaveBeenCalledWith('\x1b[32m', 'hello', '\x1b[0m')
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  it('displayYellow() should log a green coloured message and reset again to white', () => {
    console.log = jest.fn()
    view.displayYellow('hello')
    expect(console.log).toHaveBeenCalledWith('\x1b[33m', 'hello', '\x1b[0m')
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  it('displayError() should log a red coloured message and reset again to white', () => {
    console.log = jest.fn()
    view.displayError('error')
    expect(console.log).toHaveBeenCalledWith('\x1b[31m', '\n *** error ***\n', '\x1b[0m')
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  it('displaySummary() should display summary of api', () => {
    console.log = jest.fn()
    view.displaySummary({ send: ['ok', 'ok'] })
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith('  send --> ok')

    console.log = jest.fn()
    view.displaySummary({ send: ['ok', 'ok'], json: ['ok', 'ok'] })
    expect(console.log).toHaveBeenCalledTimes(4)
    expect(console.log).toHaveBeenCalledWith('  send --> ok')
    expect(console.log).toHaveBeenCalledWith('  json --> ok')
  })

  it('displayResults() should display results', () => {
    console.log = jest.fn()
    view.displayResults(
      [{ routePath: 'src/route', routeMethod: 'Post', summary: { send: ['ok', 'ok'] } }],
      'src/routes/user.js'
    )
    expect(console.log).toHaveBeenCalledTimes(5)
    expect(console.log).toHaveBeenCalledWith('')
    expect(console.log).toHaveBeenCalledWith('  send --> ok')
    expect(console.log).toHaveBeenCalledWith('\x1b[33m', 'POST route to src/route', '\x1b[0m')
    expect(console.log).toHaveBeenCalledWith(
      '\x1b[32m',
      '\n--- src/routes/user.js --------------------------------',
      '\x1b[0m'
    )
  })

  it('displayTestedFiles() should display Files', () => {
    console.log = jest.fn()
    view.displayTestedFiles(['file1', 'file2'])
    expect(console.log).toHaveBeenCalledTimes(3)
    expect(console.log).toHaveBeenCalledWith('  ** file1')
    expect(console.log).toHaveBeenCalledWith('  ** file2')
  })
})
