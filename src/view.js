/* eslint-disable no-console */

module.exports = class View {
  // terminal color references
  static white = '\x1b[0m'

  static red = '\x1b[31m'

  static green = '\x1b[32m'

  static yellow = '\x1b[33m'

  display(message) {
    console.log(`${message}`)
  }

  displayGreen(message) {
    console.log(View.green, `${message}`, View.white)
  }

  displayYellow(message) {
    console.log(View.yellow, `${message}`, View.white)
  }

  displayError(err) {
    console.log(View.red, `\n *** ${err} ***\n`, View.white)
  }

  displaySummary(summary) {
    Object.entries(summary).forEach(([key, value]) => {
      value.forEach(item => this.display(`  ${key} --> ${item}`))
    })
  }

  displayResults(results, filePath) {
    this.displayGreen(`\n--- ${filePath} --------------------------------`)

    results.forEach(endPoint => {
      this.displayYellow(`${endPoint.routeMethod.toUpperCase()} route to ${endPoint.routePath}`)
      this.displaySummary(endPoint.summary)
      this.display('')
    })
  }

  async displayTestedFiles(routeFiles) {
    this.displayGreen('\n\nFollowing route file(s) will be examined:')
    this.display(`  ** ${routeFiles}`)
  }
}
