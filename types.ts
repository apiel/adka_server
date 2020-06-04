export interface Options {
    port: number;
    root: string;
    watcher?: (root: string) => Promise<void>,
}
