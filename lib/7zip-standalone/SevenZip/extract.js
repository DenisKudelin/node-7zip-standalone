"use strict";
var externals_1 = require("../externals");
var exports_1 = require("../exports");
var SevenZip = require("./SevenZip");
/*
Switches that can be used with this command

-ai (Include archives)
-an (Disable parsing of archive_name)
-ao (Overwrite mode)
-ax (Exclude archives)
-i (Include)
-m (Method)
-o (Set Output Directory)
-p (Set Password)
-r (Recurse)
-si (use StdIn)
-sni (Store NT security information)
-sns (Store NTFS alternate Streams)
-so (use StdOut)
-spf (Use fully qualified file paths)
-t (Type of archive)
-x (Exclude)
-y (Assume Yes on all queries)
*/
function extract(archive, dest, switches, progress) {
    return externals_1.Promise.try(function () {
        if (!archive) {
            throw new Error("Archive path must be defined");
        }
        else if (!dest) {
            throw new Error("Destination path must be defined");
        }
        else if (!exports_1.Helpers.pathIsAbsoluteOrHome(archive)) {
            throw new Error("Archive path must be absolute");
        }
        var params = [exports_1.Helpers.pathResolveHome(externals_1.Path.normalize(archive)), ("-o" + exports_1.Helpers.pathResolveHome(externals_1.Path.normalize(dest)))];
        switches = externals_1._.extend([], switches);
        addOverwriteSwitches(switches);
        addFiles(switches);
        switches.push("-y");
        return SevenZip.run(switches.flatten ? "e" : "x", params, switches, progress);
    });
}
exports.extract = extract;
function addOverwriteSwitches(switches) {
    switch (switches.overwrite || OverwriteMode.All) {
        case OverwriteMode.All: return switches.push("-aoa");
        case OverwriteMode.Skip: return switches.push("-aos");
        case OverwriteMode.RenameExtracting: return switches.push("-aou");
        case OverwriteMode.RenameExisting: return switches.push("-aot");
    }
}
function addFiles(switches) {
    if (switches.files) {
        if (externals_1.Path.isAbsolute(switches.files)) {
            throw new Error("Path inside archive must be relative");
        }
        switches.unshift(switches.files);
    }
}
(function (OverwriteMode) {
    OverwriteMode[OverwriteMode["All"] = 0] = "All";
    OverwriteMode[OverwriteMode["Skip"] = 1] = "Skip";
    OverwriteMode[OverwriteMode["RenameExtracting"] = 2] = "RenameExtracting";
    OverwriteMode[OverwriteMode["RenameExisting"] = 3] = "RenameExisting";
})(exports.OverwriteMode || (exports.OverwriteMode = {}));
var OverwriteMode = exports.OverwriteMode;
