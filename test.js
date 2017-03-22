// programatically
var Mocha = require('mocha'),
fs = require('fs'),
path = require('path');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha;
// log out to the browser's console - https://github.com/simov/loca

var testDir = 'test';

// Here is an example:
fs.readdirSync(testDir).filter(function (file) {
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function (file) {
    mocha.addFile(path.join(testDir, file));
});

// Now, you can run the tests.
mocha.run(function (failures) {
    process.on('exit', function () {
        process.exit(failures);
    });
});