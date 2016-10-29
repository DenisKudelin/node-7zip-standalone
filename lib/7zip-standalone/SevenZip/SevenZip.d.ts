export { extract } from "./extract";
export { add } from "./add";
import { Promise } from "../externals";
export declare function run(command: string, params: string[], switches: string[], progress: (data: string[]) => any): Promise<{}>;
