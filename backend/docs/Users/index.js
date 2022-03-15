const registerUser = require('./registerUser');
const login = require('./login');

module.exports = {
    '/api/users/register': {
        ...registerUser
    },
    '/api/users/login': {
        ...login
    }
}