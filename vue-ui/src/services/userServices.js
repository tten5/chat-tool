import axios from 'axios'

export async function register(user) {
    const response = await axios.post('/api/users/register', {
        user
    });
    if (response.data.username) {
        return response.data.username;
    }
    else {
        return null
    }
}

export async function login(user) {
    const response = await axios.post('/api/users/login', {
        user
    });
    if (response.data.username) {
        return response.data.username;
    }
    else {
        return null
    }
}
