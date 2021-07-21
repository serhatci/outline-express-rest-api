const TextManager = require('../src/text-manager')

describe('Testing TestManager class in test-manager.js', () => {
  let textManager

  beforeEach(() => {
    textManager = new TextManager()
  })

  it('Class should have methods property', () => {
    expect(textManager).toHaveProperty('methods')
    expect(textManager.methods).toEqual([
      'append',
      'attachment',
      'cookie',
      'clearCookie',
      'download',
      'end',
      'format',
      'get',
      'json',
      'jsonp',
      'links',
      'location',
      'redirect',
      'render',
      'send',
      'sendFile',
      'sendStatus',
      'set',
      'type',
      'vary',
    ])
  })

  it('Class should have getSummary & cleanInput methods', () => {
    expect(textManager.getSummary).toBeInstanceOf(Function)
    expect(textManager.cleanInput).toBeInstanceOf(Function)
  })

  const cases = [
    ["return res.status(400).send({ message: 'ok' })", { send: ["{ message: 'ok' }"] }],
    ["return res.status(400).json({ message: 'ok' })", { json: ["{ message: 'ok' }"] }],
    ["return res.status(400).location({ message: 'ok' })", { location: ["{ message: 'ok' }"] }],
    ["return res.status(400).type({ message: 'ok' })", { type: ["{ message: 'ok' }"] }],
  ]

  test.each(cases)('%p summary is expected %p', (firstArg, expectedResult) => {
    const result = textManager.getSummary(firstArg)
    expect(result).toEqual(expectedResult)
  })

  test.each([
    ['folder', 'folder'],
    ['/folder', 'folder'],
    ['//folder', 'folder'],
    ['--folder', '--folder'],
  ])('cleanInput() %p input is expected to be returned %p', (firstArg, expectedResult) => {
    const result = textManager.cleanInput(firstArg)
    expect(result).toEqual(expectedResult)
  })

  it('cleanInput() should throw error for empty input', () => {
    expect(() => textManager.cleanInput('')).toThrow(Error)
  })

  it('outlineRouteObj() should provide an outline', () => {
    const routeObj = {}
    const handle = "return res.status(400).send({ message: 'ok' })"
    const method = 'post'
    const stack = [{ method, handle }]
    const route = { path: '/:userId', stack }
    const endPoint = { route, stack }
    routeObj.stack = [endPoint]

    expect(textManager.outlineRouteObj(routeObj)).toEqual([
      { routeMethod: 'post', routePath: '/:userId', summary: { send: ["{ message: 'ok' }"] } },
    ])
  })
})
