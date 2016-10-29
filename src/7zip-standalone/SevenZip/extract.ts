import {_, Path, Promise} from "../externals";
import {Helpers} from "../exports";
import * as SevenZip from "./SevenZip";

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

export function extract(archive: string, dest: string, switches?: IExtractSwitches, progress?: (data: string[]) => void) {
    return Promise.try(() => {
        if(!archive) {
            throw new Error("Archive path must be defined");
        } else if(!dest) {
            throw new Error("Destination path must be defined");
        }  else if(!Helpers.pathIsAbsoluteOrHome(archive)) {
            throw new Error("Archive path must be absolute");
        }

        var params = [Helpers.pathResolveHome(Path.normalize(archive)), `-o${Helpers.pathResolveHome(Path.normalize(dest))}`];

        switches = _.extend([], switches);
        addOverwriteSwitches(switches);
        addFiles(switches);

        switches.push("-y");
        return SevenZip.run(switches.flatten ? "e" : "x", params, switches, progress);
    });
}

function addOverwriteSwitches(switches: IExtractSwitches) {
    switch(switches.overwrite || OverwriteMode.All) {
        case OverwriteMode.All: return switches.push("-aoa");
        case OverwriteMode.Skip: return switches.push("-aos");
        case OverwriteMode.RenameExtracting: return switches.push("-aou");
        case OverwriteMode.RenameExisting: return switches.push("-aot");
    }
}

function addFiles(switches: IExtractSwitches) {
    if(switches.files) {
        if(Path.isAbsolute(switches.files)) {
            throw new Error("Path inside archive must be relative");
        }

        switches.unshift(switches.files);
    }
}

export interface IExtractSwitches extends Array<string> {
    overwrite?: OverwriteMode;
    flatten?: boolean;
    files?: string;
}

export enum OverwriteMode {
    All,
    Skip,
    RenameExtracting,
    RenameExisting 
}