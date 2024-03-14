import { DataSource, type DataSourceOptions } from 'typeorm'
import path from 'path'
import { type SeederOptions } from 'typeorm-extension'
import { readdirSync } from 'fs'
import { env } from '../config/env'
import { MainSeeder } from './seeds/main-seeder'

const getFiles = (dir: 'entities' | 'migrations'): string[] => {
    let pathDir = ''

    if (dir === 'entities') {
        pathDir = path.join(__dirname, '..', '..', 'domain', dir)
    } else if (dir === 'migrations') {
        pathDir = path.join(__dirname, dir)
    }

    const pathFiles = readdirSync(pathDir)
    return pathFiles
        .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
        .map(file => path.join(pathDir, file))
}

export const optionsDataSource: DataSourceOptions & SeederOptions = ({
    type: 'mysql',
    url: env.DB_URL,
    entities: getFiles('entities'),
    migrations: getFiles('migrations'),
    seeds: [MainSeeder],
    seedTracking: false,
    synchronize: env.NODE_ENV !== 'production'
})
const AppDataSource = new DataSource(optionsDataSource)

export default AppDataSource
