/* eslint-disable no-console */

module.exports = class Terminal {
  // terminal color references
  static white = '\x1b[0m'

  static red = '\x1b[31m'

  static green = '\x1b[32m'

  static yellow = '\x1b[33m'

  display(message) {
    console.log(`${message}`)
  }

  displayGreen(message) {
    console.log(Terminal.green, `${message}`, Terminal.white)
  }

  displayYellow(message) {
    console.log(Terminal.yellow, `${message}`, Terminal.white)
  }

  displayError(err) {
    console.log(Terminal.red, `\n *** ${err} ***\n`, Terminal.white)
  }

  displaySummary(summary) {
    Object.entries(summary).forEach(([key, value]) => {
      value.forEach(item => this.display(`  ${key} --> ${item}`))
    })
  }

  displayResults(results, filename) {
    this.displayGreen(`\n--- ${filename} --------------------------------`)

    results.forEach(endPoint => {
      this.displayYellow(`${endPoint.routeMethod.toUpperCase()} route to ${endPoint.routePath}`)
      this.displaySummary(endPoint.summary)
      this.display('')
    })
  }

  async displayTestedFiles(routeFiles) {
    this.displayGreen('\n\nFollowing route file(s) will be examined:')
    routeFiles.forEach(file => this.display(`  ** ${file}`))
  }
}
