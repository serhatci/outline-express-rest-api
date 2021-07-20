/* eslint-disable no-console */
const readline = require('readline')
const View = require('../src/view')

describe('Testing View class in view.js', () => {
  let view

  beforeEach(() => {
    view = new View()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Class should have specific properties', () => {
    expect(View).toHaveProperty('white')
    expect(View).toHaveProperty('green')
    expect(View).toHaveProperty('red')
    expect(View).toHaveProperty('yellow')
  })

  it('Class should have specific methods', () => {
    expect(view.display).toBeInstanceOf(Function)
    expect(view.displayGreen).toBeInstanceOf(Function)
    expect(view.displayYellow).toBeInstanceOf(Function)
    expect(view.displayError).toBeInstanceOf(Function)
    expect(view.displaySummary).toBeInstanceOf(Function)
    expect(view.askConfirmation).toBeInstanceOf(Function)
    expect(view.stopExecution).toBeInstanceOf(Function)
  })
  it('Class color properties should match with Terminal color references', () => {
    expect(View.white).toBe('\x1b[0m')
    expect(View.red).toBe('\x1b[31m')
    expect(View.green).toBe('\x1b[32m')
    expect(View.yellow).toBe('\x1b[33m')
  })

  it('Class should instantiate readline Interface', () => {
    expect(view.rl).toBeInstanceOf(readline.Interface)
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

  it('askConfirmation() should display routeFiles and wait for user click', () => {
    console.log = jest.fn()
    view.askConfirmation(['file1', 'file2'])
    expect(console.log).toHaveBeenCalledTimes(3)
    expect(console.log).toHaveBeenCalledWith('  ** file1,file2')
  })

  it('stopExecution() should exit from terminal app', () => {
    view.rl.close = jest.fn()
    view.stopExecution()
    expect(view.rl.close).toHaveBeenCalledTimes(1)
  })
})
