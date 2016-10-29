"use strict";
var externals_1 = require("../externals");
var Helpers;
(function (Helpers) {
    function pathIsAbsoluteOrHome(path) {
        return externals_1.Path.isAbsolute(path) || (path && externals_1._.startsWith(path, "~"));
    }
    Helpers.pathIsAbsoluteOrHome = pathIsAbsoluteOrHome;
    function pathResolveHome(path) {
        return externals_1._.startsWith(path, "~") ? path.replace("~", process.env.HOME) : path;
    }
    Helpers.pathResolveHome = pathResolveHome;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
