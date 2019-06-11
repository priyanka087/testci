'use strict';
// Node package
const fs = require("fs")
const git = require('git-rev-sync');

// Constants
const VERSION = process.env.npm_package_version;
const LAST_COMMIT=git.long();

// Write the version and last commit sha to text files
fs.writeFileSync('./src/version.txt', VERSION);
fs.writeFileSync('./src/sha.txt', LAST_COMMIT)

// Running the app services
const Services = function() {
    // The application description - will be returned from the healthcheck endpoint
    this.applicationDescription = "pre-interview technical test";
};

Services.prototype = {

    // Get the application version of from the package.json file
    Version: function() {
        try {
            const result = fs.readFileSync('./src/version.txt').toString().trim();
            if (result != '') return result;
        } catch (e) {
            // will return 'unknown' value if 'version.txt' file is empty
        }
        return "unknown";
    },

    // get the last long commit_sha using git-rev-sync package
    LastCommitsha: function() {
        try {
            const result = fs.readFileSync('./src/sha.txt').toString().trim();
            if (result != '') return result;
        } catch (e) {
            // will return 'unknown' value if the 'sha.txt' file is empty
        }
        return "unknown";
    },

    // The "Version" endpoint handler
    handleVersion: function (req, res) {
        const payload = {
            "myApplication" : [{
                "version" : this.Version(),
                "lastcommitsha" : this.LastCommitsha(),
                "description": this.applicationDescription
            }]};
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(payload, null, 2));
        res.end();
    },

    // The entrypoint endpoint handler
    requestHandler: function (req, res) {
        const [when, who, what] = [new Date().toISOString(), req.connection.remoteAddress, req.url];
        console.log(`[${ when }] - client: [${ who }] - path: [${ what }]`); //eslint-disable-line no-console
        if (what != '/version') {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("Not Found");
            res.end();
            return;
        }
        this.handleVersion(req, res);
    }

};

module.exports = Services;
