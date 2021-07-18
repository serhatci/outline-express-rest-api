const View = require('./view');
const FileManager = require('./fileManager');

const view = new View();
const fileManager = new FileManager();

function summarizeErrorReturns(line) {
  const errorValue = line.match(/(?<=next\().*?(?=\))/);
  view.display(`         next() --> ${errorValue}`);
}

function summarizeReturnValues(line) {
  const sentValue = line.match(/(?<=\.send\().*?(?=\))/);
  view.display(`     may return --> ${sentValue}`);
}

function summarizeEndPoints(line) {
  const httpRequestType = line.match(/[^router.]\w*/);
  const endPoint = line.match(/(?<=\().*?(?=,)/);
  view.display(
    `  \n${httpRequestType[0].toLocaleUpperCase()} route to ${endPoint}`
  );
}

async function getRouteFiles(path) {
  const filesArr = await fileManager.getJsFilesInFolder(path);
  view.displayGreen('\n\nFollowing route file(s) will be examined:');
  view.display(`  ** [${filesArr}]`);
  await view.askForExecution();
  return filesArr;
}

view.display(`
This package provides a short summary of your Express rest API.
Before you start, please make sure that you saved & formatted all your route files.

Click CTRL+C for exit
    `);

async function init() {
  try {
    const path = await view.askRoutesFolder();
    fileManager.checkPath(path);

    const filesArr = await getRouteFiles(path);

    for (const file of filesArr) {
      view.displayGreen(`\n--- ${file} ------------------------------------`);

      const fileText = await fileManager.readFileContent(path, file);
      const allLines = fileText.split(/\r\n|\n/);

      allLines.forEach((line) => {
        if (line.match(/^router./)) {
          summarizeEndPoints(line);
        }

        if (line.match(/.send\(/)) {
          summarizeReturnValues(line);
        }

        if (line.match(/next\(/)) {
          summarizeErrorReturns(line);
        }
      });
    }

    view.endExecution();
  } catch (err) {
    if (err.name === 'FileSysErr') {
      view.displayError(err.message);
      init();
    } else {
      view.displayError(err);
      view.endExecution();
    }
  }
}

init();
