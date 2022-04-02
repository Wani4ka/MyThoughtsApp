import express from 'express'
import config from './config'
import { apiErrorHandler } from './core/error'
import auth from './routes/auth.routes'
import thoughts from './routes/thoughts.routes'
import path from 'path'

import session from 'express-session'
import session_file_store from 'session-file-store'
const FileStore = session_file_store(session)

const app = express()
app.use(express.json())
app.use(session({
	secret: config.sessionSecret,
	store: new FileStore({ logFn: () => {} }),
	saveUninitialized: false,
	resave: true
}))

app.use('/auth', auth)
app.use('/api/thoughts', thoughts)

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}

app.use(apiErrorHandler)

app.listen(config.port, () => console.log('Backend is up!'))