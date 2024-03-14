import type { DataSource } from 'typeorm'
import type { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { ROLES, Role } from '../../../domain/entities/Role'

export default class RolesSeeder implements Seeder {
    public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const rolesRepository = dataSource.getRepository(Role)

        for (const role of ROLES) {
            const exists = await rolesRepository.findOne({ where: { id: role.id, name: role.name } })

            if (!exists) {
                await rolesRepository.save(role)
                console.log(`RoleSeeder: ${role.name} created`)
            }
        }
    }
}
