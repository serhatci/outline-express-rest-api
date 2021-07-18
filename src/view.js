const readline = require('readline');
const util = require('util');

module.exports = class View {
  // terminal color references
  static white = '\x1b[0m';
  static red = '\x1b[31m';
  static green = '\x1b[32m';

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.question = util.promisify(this.rl.question).bind(this.rl);
  }

  display(message) {
    console.log(`${message}`);
  }

  displayGreen(message) {
    console.log(View.green, `${message}`, View.white);
  }

  displayError(err) {
    console.log(View.red, `\n *** ${err} ***\n`, View.white);
  }

  async askRoutesFolder() {
    this.displayGreen('Provide your routes folder by editing below line:');
    this.rl.write(`${process.cwd()}/src/routes`);

    const path = await this.question('>');
    return path;
  }

  async askForExecution() {
    this.display('\nClick any key to continue... (CTRL+C for Exit)');
    process.stdin.setRawMode(true);
    return new Promise((resolve) =>
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve();
      })
    );
  }

  endExecution() {
    this.rl.close();
  }
};
