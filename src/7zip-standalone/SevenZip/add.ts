import {_, Path, Promise} from "../externals";
import {Helpers} from "../exports";
import * as SevenZip from "./SevenZip";

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
export function add(archive: string, files: string, switches?: string[], progress?: (data: string[]) => void) {
    return Promise.try(() => {
        if(!archive) {
            throw new Error("Archive path must be defined");
        } else if(!files) {
            throw new Error("Files path must be defined");
        } else if(!Helpers.pathIsAbsoluteOrHome(archive)) {
            throw new Error("Archive path must be absolute");
        }

        var params = [Helpers.pathResolveHome(Path.normalize(archive)), Helpers.pathResolveHome(Path.normalize(files))];
        switches = _.extend([], switches);
        return SevenZip.run("a", params, switches, progress);
    });
}