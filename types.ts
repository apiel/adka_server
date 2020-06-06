export interface Options {
    port: number;
    root: string;
    htmlExt?: RegExp;
    debug?: boolean;
    watcher?: null | ((root: string) => Promise<void>);
}
