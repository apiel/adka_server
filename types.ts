export interface Options {
    port: number;
    root: string;
    watcher?: null | ((root: string) => Promise<void>);
}
