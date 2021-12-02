

declare module 'good-storage' {
  interface Set {
    (key: string, value: any): void
  }
  declare function set(key: string, value: any): void
  declare function get<T>(key: string, def: T): T
  declare function remove(key: string): void
  declare function has(key: string): any
  declare function clear(): void
  declare function getAll(): any
  declare function forEach(): any
  declare const storage: {
    set(key: string, value: any): void
    get<T>(key: string, def: T): T
  }
}