export interface UseCase <T = any> {
    execute: (data: T) => Promise<any>
}
