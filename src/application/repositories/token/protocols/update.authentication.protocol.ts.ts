export interface UpdateAuthenticationData {
    token: string
}

export interface UpdateAuthenticationRepository {
    update: (id: string, data: UpdateAuthenticationData) => Promise<void>
}
