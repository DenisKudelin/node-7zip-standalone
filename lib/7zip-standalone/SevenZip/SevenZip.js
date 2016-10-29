"use strict";
var extract_1 = require("./extract");
exports.extract = extract_1.extract;
var add_1 = require("./add");
exports.add = add_1.add;
var externals_1 = require("../externals");
var SevenZipBinaries = require("../SevenZipBinaries");
var errorRegex = new RegExp('Error:(' + externals_1.OS.EOL + '|)?(.*)', 'i');
function run(command, params, switches, progress) {
    if (!externals_1._.isString(command)) {
        throw new Error("Wrong type of command");
    }
    else if (!externals_1._.isArray(switches)) {
        throw new Error("Wrong type of switches");
    }
    else if (!externals_1._.isArray(params)) {
        throw new Error("Wrong type of parameters");
    }
    var args = [command];
    params.forEach(function (param) {
        args.push(param.toString());
    });
    externals_1._.uniq(switches).forEach(function (swch) {
        args.push(swch.toString());
    });
    args = args.map(function (x) { return x.substr(0, 1) !== "-" ? x.replace(/^"/, "").replace(/"$/, '') : x; });
    if (!switches.some(function (x) { return x === "-bb2"; })) {
        switches.push("-bb2");
    }
    var sevenZipProcess = externals_1.Child_Process.spawn(SevenZipBinaries.get7zPath(), args, { stdio: "pipe" });
    var defer = externals_1.Promise.defer();
    var progressData = [];
    sevenZipProcess.stderr.on('data', function (data) {
        var errRegexData = errorRegex.exec(data.toString());
        if (errRegexData) {
            defer.reject(errRegexData[2].substr(0, errRegexData[2].length - 1));
            sevenZipProcess.kill();
        }
    });
    sevenZipProcess.stdout.on('data', function (data) {
        data = data && data.toString();
        progressData.push(data);
        return progress && progress(data && data.split(externals_1.OS.EOL));
    });
    sevenZipProcess.on("error", function (error) { return defer.reject(error); });
    sevenZipProcess.on("close", function (code) { return code === 0 ? defer.resolve() : defer.reject(progressData.join(externals_1.OS.EOL)); });
    return defer.promise;
}
exports.run = run;
