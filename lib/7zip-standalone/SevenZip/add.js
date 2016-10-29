"use strict";
var externals_1 = require("../externals");
var exports_1 = require("../exports");
var SevenZip = require("./SevenZip");
/*
Switches that can be used with this command

-i (Include)
-m (Method)
-p (Set Password)
-r (Recurse)
-sdel (Delete files after including to archive)
-sfx (create SFX)
-si (use StdIn)
-sni (Store NT security information)
-sns (Store NTFS alternate Streams)
-so (use StdOut)
-spf (Use fully qualified file paths)
-ssw (Compress shared files)
-stl (Set archive timestamp from the most recently modified file)
-t (Type of archive)
-u (Update)
-v (Volumes)
-w (Working Dir)
-x (Exclude)
*/
function add(archive, files, switches, progress) {
    return externals_1.Promise.try(function () {
        if (!archive) {
            throw new Error("Archive path must be defined");
        }
        else if (!files) {
            throw new Error("Files path must be defined");
        }
        else if (!exports_1.Helpers.pathIsAbsoluteOrHome(archive)) {
            throw new Error("Archive path must be absolute");
        }
        var params = [exports_1.Helpers.pathResolveHome(externals_1.Path.normalize(archive)), exports_1.Helpers.pathResolveHome(externals_1.Path.normalize(files))];
        switches = externals_1._.extend([], switches);
        return SevenZip.run("a", params, switches, progress);
    });
}
exports.add = add;
