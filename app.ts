import express from 'express'
import config from './config'
import { apiErrorHandler } from './core/error'
import session from 'express-session'

import auth from './routes/auth.routes'
import thoughts from './routes/thoughts.routes'
import path from 'path'

const app = express()
app.use(express.json())

const MySQLStore = require('express-mysql-session')(session)

app.use(session({
	secret: config.sessionSecret,
	store: new MySQLStore({
		host: config.db.host,
		port: config.db.port,
		user: config.db.user,
		password: config.db.pass,
		database: config.db.name
	}),
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