const db = require('../config/db')
const testPassword = require('../config/common').testPassword;
const mobileNumberValidation = require('../config/common').mobileNumberValidation;
const bcrypt = require('bcrypt');
const BcryptSalt = require('bcrypt-salt');
const bs = new BcryptSalt();
const Role = require('../config/constant').Role
const crypto = require('crypto')

createAccessToken = async (data, callback) => {
    try {

        let token = await db['access_token'].findOneAndUpdate({
            userId: data.userId
        }, data,
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );
        console.log(token);
        return token
        // callback(token)

    } catch (error) {
        console.log("Error in create access token : ", error);
        return error
        // callback(error)
        // callback ? callback(error) : null
    }
}

createRefreshToken = async (data, callback) => {
    try {
        let token = await db['refresh_token'].findOneAndUpdate({
            userId: data.userId
        }, data,
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );
        console.log(token);
        // callback(token)
        return token
    } catch (error) {
        console.log("Error in create refresh token : ", error);
        // callback(error);
        return error
    }
}

createToken = (userId) => {
    const access_token = crypto.randomBytes(64).toString('hex');
    const refresh_token = crypto.randomBytes(64).toString('hex');
    createAccessToken({
        token: access_token,
        expire_date: new Date(Date.now() + (2 * 3600000)).toString(),
        userId: userId,
        client_id: null
    })
    createRefreshToken({
        token: refresh_token,
        expire_date: new Date(Date.now() + (7 * 24 * 3600000)).toString(),
        userId: userId,
        client_id: null
    });
    return { access_token, refresh_token }
}

revokeToken = async (token) => {
    try {
        let refreshToken = await this.refreshRepository.findOne({ where: { token: token } });
        console.log(" <<<<<<<<<<<<<<<<<< Grant type Refresh Token >>>>>>>>>>>>>>> ", token);
        console.log(refreshToken);
        return refreshToken
    } catch (error) {
        console.log(`Error in revoke token : ${error}`)
    }
}

module.exports = {
    signUp: async (req, callback) => {
        try {
            let user = req.body;
            if (await db['user'].findOne({ email: user.email })) {
                callback(404, 'Email ' + user.email + ' is already taken')
            } else {
                if (await db['user'].findOne({ email: user.username })) {
                    callback(404, 'Username ' + user.username + ' is already taken')
                } else {
                    if (user.mobileNo) {
                        console.log(user.mobileNo);
                        var mobileValid = mobileNumberValidation(user.mobileNo);
                        if (mobileValid != true) {
                            callback(400, mobileValid);
                        } else {
                            let hashPassword = '';
                            var passValid = testPassword(user.password);
                            if (passValid != true) {
                                callback(400, passValid);
                            } else {
                                hashPassword = await bcrypt.hash(user.password, bs.saltRounds);
                                //end validation

                                const newUser = new db['user'](req.body);
                                newUser.password = hashPassword;
                                newUser.save()
                                    .then(async (userDetails) => {
                                        callback(200, 'Sign-Up Successfull');
                                    })
                                    .catch(err => {
                                        callback(500, 'error in saving user details');
                                    });
                            }
                        }
                    } else {
                        callback(500, 'Please enter a valid mobile number');
                    }
                }
            }
        } catch (error) {
            console.log(error);
            callback(500, error.message, error);
        }
    },
    login: async (req, callback) => {
        try {
            var user = req.body
            let userEmail = await db['user'].findOne({ email: user.email });
            if (userEmail == null) {
                callback(404, 'Email ' + req.body.email + ' not found in db')
            } else {
                if (userEmail.isActive == false) {
                    callback(404, 'Your Account is disabled please contact Administrator');
                } else {
                    if (userEmail.role == Role.User) {
                        if (await bcrypt.compare(user.password, userEmail.password)) {
                            callback(200, "Login Successfull", createToken(user.id))
                        } else {
                            callback(404, "Not found")
                        }
                    } else {
                        callback(404, 'Your Account is disabled please contact Administrator');
                    }
                }
            }
        } catch (error) {
            console.log(error);
            callback(500, error.message, error);
        }
    }
}