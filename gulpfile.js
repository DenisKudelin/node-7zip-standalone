var gulp = require("gulp");
var runSequence = require("run-sequence");
var builder = require("tsconfig-extended-typescript-builder");

var tsConfigPath = __dirname + "/src/7zip-standalone/tsconfig.json";

gulp.task("build", () => {
    return builder.build(tsConfigPath);
});

gulp.task("clean", () => {
    return builder.clean(tsConfigPath);
});

gulp.task("clean-build", () => {
    return runSequence("clean", "build");
});

gulp.task("test", () => {
    var SevenZip = require("./index");
    //return SevenZip.add("~/Documents/node/azaza.7z", "~/Documents/node/node-7zip-standalone/src/**/*");
    //return SevenZip.extract("~/Documents/node/azaza.7z", "~/Documents/node/azaza/");

    //return SevenZip.add("/home/node/azaza.7z", "/home/node/node-7zip-standalone/src/**/*");
    //return SevenZip.extract("/home/node/azaza.7z", "/home/node/azaza/");

    //return SevenZip.add("D:/node/azaza.7z", "D:/node/node-7zip-standalone/src/**/*");
    //return SevenZip.extract("D:/node/azaza.7z", "D:/node/azaza/");
});