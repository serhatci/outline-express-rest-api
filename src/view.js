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

  async askConfirmation(routeFiles) {
    this.displayGreen('\n\nFollowing route file(s) will be examined:')
    this.display(`  ** ${routeFiles}`)
    this.display('\nClick any key to continue... (CTRL+C for Exit)')

    // taken from
    // https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
    process.stdin.setRawMode(true)
    return new Promise(resolve =>
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false)
        resolve()
      })
    )
  }

  stopExecution() {
    this.rl.close()
  }
}
