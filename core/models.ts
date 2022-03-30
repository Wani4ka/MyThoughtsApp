import { PrismaClient } from '@prisma/client'
import config from '../config'
export default new PrismaClient({
	datasources: {
		db: {
			url: `mysql://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.database}`
		}
	}
})