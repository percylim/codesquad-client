const env = process.env;

module.exports = {
    'connection': {
        'host': env.DB_HOST || 'sql6.freemysqlhosting.net',
        'user': env.DB_USER || 'sql6424048',
        'password': env.DB_PASSWORD || 'pl123456',
        'timezone' : '+00:00',
    },

	'database':env.DB_NAME || 'JZjZpssFYy',
    'users_table': 'admin'
};
