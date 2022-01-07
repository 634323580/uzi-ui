declare function set(key: string, value: any): void;
declare function get<T>(key: string, def: T): T;
declare function remove(key: string): void;
declare function has(key: string): boolean;
declare function clear(): void;
declare function getAll(): any;
declare function forEach(callback: (key: string, value: any) => any): any;

export { set, get, remove, has, clear, getAll, forEach };
