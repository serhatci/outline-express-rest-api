module.exports = class TextManager {
  constructor() {
    this.methods = [
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
    ]
  }

  getSummary(routeFunc) {
    const funcText = routeFunc.toString()
    const summary = {}

    this.methods.forEach(method => {
      const expression = `(?<=\\.${method}\\().*?(?=\\))`
      const regex = new RegExp(expression, 'g')
      const match = funcText.match(regex)

      if (match) summary[`${method}`] = match
    })

    return summary
  }

  cleanInput(inputText) {
    if (!inputText) throw Error('A filename or folder must be provided after outline command!')

    return inputText.replace(new RegExp(/^\/*/), '')
  }

  outlineRouteObj(routeObj, extraFeature) {
    return routeObj.stack.map(endPoint => {
      const routeSummary = {}
      routeSummary.routePath = endPoint.route.path
      routeSummary.routeMethod = endPoint.route.stack[0].method

      if (!extraFeature) return routeSummary

      const routeFunc = endPoint.route.stack[0].handle
      routeSummary.summary = this.getSummary(routeFunc)

      return routeSummary
    })
  }

  getFilename(filePath) {
    const filename = filePath.match(/([^/]+)\.js$/)
    return filename ? filename[0] : ''
  }

  evaluateExtraFeature(input) {
    if (!input) return false

    if (input == '--methods') return true

    throw Error(`You need to use --methods instead of ${input}!`)
  }
}
