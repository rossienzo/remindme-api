export interface FindByEmailUserRepository {
    findByEmail: (email: string) => Promise<boolean>
}
