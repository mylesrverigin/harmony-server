const jwt = require('jsonwebtoken')

const createAuthToken = (data) => {
    try {
        return jwt.sign(data, process.env.SECRET_KEY_AUTH)
    }catch {
        return null;
    }
}

const createRefreshToken = (data) => {
    try {
        return jwt.sign(data, process.env.SECRET_KEY_REFRESH)
    }catch {
        return null;
    }
}

const decodeAuthToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY_AUTH);
    }catch {
        return null
    }
}

const decodeRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY_REFRESH);
    }catch {
        return null
    }
}

module.exports = { createAuthToken, decodeAuthToken, createRefreshToken, decodeRefreshToken};