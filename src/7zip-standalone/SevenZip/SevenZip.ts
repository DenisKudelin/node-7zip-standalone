export {extract} from "./extract";
export {add} from "./add";
import {_, Path, OS, Child_Process, Promise} from "../externals";
import {Helpers} from "../exports";
import * as SevenZipBinaries from "../SevenZipBinaries";

let errorRegex =  new RegExp('Error:(' + OS.EOL + '|)?(.*)', 'i');
export function run(command: string, params: string[], switches: string[], progress: (data: string[]) => any) {
    if (!_.isString(command)) {
        throw new Error("Wrong type of command");
    } else if(!_.isArray(switches)) {
        throw new Error("Wrong type of switches");
    } else if(!_.isArray(params)) {
        throw new Error("Wrong type of parameters");
    }

    let args: string[] = [command];
    params.forEach(param => {
        args.push(param.toString());
    });

    _.uniq(switches).forEach(swch => {
        args.push(swch.toString());
    });

    args = args.map(x => x.substr(0, 1) !== "-" ? x.replace(/^"/, "").replace(/"$/, '') : x);
    if(!switches.some(x => x === "-bb2")) {// In order to get file info
        switches.push("-bb2");
    }

    let sevenZipProcess = Child_Process.spawn(SevenZipBinaries.get7zPath(), args, { stdio: "pipe" });
    let defer = Promise.defer();
    let progressData: string[] = []; 
    sevenZipProcess.stderr.on('data', (data) => {
        let errRegexData = errorRegex.exec(data.toString());
        if (errRegexData) {
            defer.reject(errRegexData[2].substr(0, errRegexData[2].length - 1));
            sevenZipProcess.kill();
        }
    });
    sevenZipProcess.stdout.on('data', (data: string) => {
        data = data && data.toString();
        progressData.push(data);
        return progress && progress(data && data.split(OS.EOL));
    });
    sevenZipProcess.on("error", (error) => defer.reject(error));
    sevenZipProcess.on("close", code => code === 0 ? defer.resolve() : defer.reject(progressData.join(OS.EOL)));

    return defer.promise;
}