import { Promise } from "../externals";
export declare function extract(archive: string, dest: string, switches?: IExtractSwitches, progress?: (data: string[]) => void): Promise<{}>;
export interface IExtractSwitches extends Array<string> {
    overwrite?: OverwriteMode;
    flatten?: boolean;
    files?: string;
}
export declare enum OverwriteMode {
    All = 0,
    Skip = 1,
    RenameExtracting = 2,
    RenameExisting = 3,
}
