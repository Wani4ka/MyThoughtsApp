export default interface Config {
	port: number
	db: {
		host: string
		port: number
		user: string
		pass: string
		name: string
	}
	pageSize: number
	usernameFormat: RegExp
	sessionSecret: string
	invite: string
}