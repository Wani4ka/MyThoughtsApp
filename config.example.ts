import Config from './declarations/config'

const config: Config = {
    port: 5000,
    db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: '',
        name: 'mythoughts'
    },
    pageSize: 20,
    usernameFormat: /^[a-z0-9_]{3,}$/,
    sessionSecret: 'SessionSecretRequiredByExpressSession :)',
    invite: 'spb2022',
}

export default config