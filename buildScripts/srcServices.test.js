const expect = require('chai').expect;
const fs = require('fs');
const git = require ('git-rev-sync');

// Constants
const APP_VERSION = process.env.npm_package_version;
const LAST_COMMIT=git.long();

// Test Cases
describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('Checking the app Version', () => {
  it('Checking the app version', (done) => {
    const VERSION = fs.readFileSync('./src/version.txt', "utf-8")
    expect(APP_VERSION).to.equal(VERSION);
    done();
  });
});

describe('Checking the last commit sha ', () => {
  it('Testing the last git commit sha', (done) => {
    const CURRENT = fs.readFileSync('./src/sha.txt', "utf-8")
    expect(LAST_COMMIT).to.equal(CURRENT);
    done();
  });
});

