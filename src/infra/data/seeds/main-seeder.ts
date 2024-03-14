import type { DataSource } from 'typeorm'
import { runSeeder, type Seeder, type SeederFactoryManager } from 'typeorm-extension'
import RolesSeeder from './roles-seeder'

export class MainSeeder implements Seeder {
    public async run (dataSource: DataSource, factoryManager?: SeederFactoryManager): Promise<any> {
        await runSeeder(dataSource, RolesSeeder)
            .catch((error) => { console.log('>> CellSeeder Error: ', error) })
    }
}
