export interface Options {
    port: number;
    root: string;
    htmlExt?: RegExp;
    watcher?: null | ((root: string) => Promise<void>);
}
