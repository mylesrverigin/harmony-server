const bcrypt = require('bcrypt');

const hashPw = (pw) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pw,salt);
}

const compareHash = (pw,hashPw) => {
    return bcrypt.compareSync(pw, hashPw);
}

module.exports = { hashPw, compareHash }