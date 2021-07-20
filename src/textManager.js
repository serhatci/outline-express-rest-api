module.exports = class TextManager {
  methods = [
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
}
