"use strict";
var externals_1 = require("./externals");
var currentPath;
function get7zPath() {
    if (currentPath) {
        return currentPath;
    }
    currentPath = externals_1.Path.join(__dirname, "../../binaries", getPlatformArchPath());
    if (externals_1.OS.platform() !== "win32") {
        externals_1.FS.chmodSync(currentPath, 757);
    }
    return currentPath;
}
exports.get7zPath = get7zPath;
function getPlatformArchPath() {
    switch (externals_1.OS.platform()) {
        case "win32": return externals_1.Path.join("win32", externals_1.OS.arch() === "x64" ? "x64","7z.exe" : "7z.exe");
        case "linux": return externals_1.Path.join("linux", "7z");
        case "darwin": return externals_1.Path.join("darwin", "7z");
    }
}
