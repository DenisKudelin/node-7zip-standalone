import {_, Path, Promise} from "../externals";

export module Helpers {
    export function pathIsAbsoluteOrHome(path: string) {
        return Path.isAbsolute(path) || (path && _.startsWith(path, "~"));
    }

    export function pathResolveHome(path: string) {
        return _.startsWith(path, "~") ? path.replace("~", process.env.HOME) : path;
    }
}