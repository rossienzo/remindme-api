import dotenv from 'dotenv'
const isTesting = process.argv.includes('test')

if (isTesting) {
    dotenv.config({ path: '.env.test' })
} else {
    dotenv.config()
}

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: process.env.PORT ?? 3000,
    DB_URL: process.env.DB_URL ?? 'postgres://postgres:docker@localhost:5432/db_test'
}
