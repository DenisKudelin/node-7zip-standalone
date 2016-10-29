import {OS, Path, FS} from "./externals";

let currentPath: string;
export function get7zPath() {
    if(currentPath) {
        return currentPath;
    }

    currentPath = Path.join(__dirname, "../../binaries", getPlatformArchPath());
    if(OS.platform() !== "win32") {
        FS.chmodSync(currentPath, 757);
    }

    return currentPath;
}

function getPlatformArchPath() {
    switch(OS.platform()) {
        case "win32": return Path.join("win", OS.arch() === "x64" ? "x64" : "x86", "7z.exe");
        case "linux": return Path.join("linux", "7z");
        case "darwin": return Path.join("mac", "7z");
    }
}