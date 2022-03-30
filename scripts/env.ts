import { writeFileSync } from 'fs'
import config from '../config'

const { host, port, user, pass, name } = config.db
writeFileSync('./.env', `DATABASE_URL=mysql://${user}${pass && (':' + pass)}@${host}:${port}/${name}\n`)