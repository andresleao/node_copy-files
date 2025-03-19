'use strict';

const fs = require('fs');
const path = require('path');

function copyFile(source, destination) {
  if (path.resolve(source) === path.resolve(destination)) {
    console.error('Source and destination are the same. No action taken.');

    return;
  }

  if (fs.existsSync(source) && fs.lstatSync(source).isDirectory()) {
    console.error('Source is a directory. Only files are supported.');

    return;
  }

  if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
    console.error('Destination is a directory. Only files are supported.');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error(`Source file does not exist: ${source}`);

    return;
  }

  fs.copyFileSync(source, destination);
  console.log(`File copied from ${source} to ${destination}`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Should provide two arguments.');

    return;
  }

  const [source, destination] = args;

  copyFile(source, destination);
}

main();
