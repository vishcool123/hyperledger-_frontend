const jwt = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem');
const {
    handleError,
    unAuthorized
} = require('../config/requestHandler');
const keysList = require('../config/jwk').keys;
const db = require('../connections/dbMaster');

module.exports.authorizer = async (req, res, next) => {
    try {
        console.log('req.headers --> ', req.headers, 'body --> ', req.body)
        if (req.body.cognitoId) {
            next();
        } else {
            const token = req.headers.authorization;
            const pems = {};
            const keys = keysList;
            for (let i = 0; i < keys.length; i++) {
                let key_id = keys[i].kid;
                let modulus = keys[i].n;
                let exponent = keys[i].e;
                let key_type = keys[i].kty;
                let jwk = { kty: key_type, n: modulus, e: exponent };
                let pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            const decodedJwt = jwt.decode(token, { complete: true });
            console.log('decodedJwt -> ', decodedJwt)
            if (!decodedJwt) {
                return handleError({ res, statusCode: 403, err: 'token expired' });
            }
            const kid = decodedJwt.header.kid;
            const pem = pems[kid];
            if (!pem) {
                return handleError({ res, statusCode: 403, err: 'token expired' });
            }
            return jwt.verify(token, pem, async (err, payload) => {
                if (err) {
                    return handleError({ res, statusCode: 403, err: 'token expired' });
                }
                else {
                    req.body.cognitoId = payload.sub;
                    next();
                }
            });
        }
    } catch (err) {
        return handleError({ res, statusCode: 500, err: 'authorization failed' });
    }
}
module.exports.userData = async (req, res, next) => {
    try {
        let userType = ''
        if (req.body.params && req.body.params.header)
            userType = req.body.params.header.usertype
        else userType = req.headers.usertype
        const dbCollectionName = db.collection(userType);
        const user = await dbCollectionName.aggregate([
            {
                '$match': {
                    'cognitoUserId': req.body.cognitoId ? req.body.cognitoId : req.user.cognitoId
                }
            }
        ]).toArray();
        req.user = user[0];
        next();
    } catch (err) {
        console.log(err);
    }
}
module.exports.providerRoleBaseAccess = async (req, res, next) => {
    try {
        if (req.user.isSuperProvider) {
            next();
        } else {
            const a = req.user.role
            const getUserDetails = req.user
            // getUserDetails = getUserDetails[0];
            const newObj = { ...a, ...req.user.otherResponsibilities }
            const accessPageName = req.accessPage;
            console.log('accessPageName ==> ', accessPageName);

            let accessMethod = ''
            if (req.method === 'POST') {
                accessMethod = 'create'
            } else if (req.method === 'GET') {
                accessMethod = 'view'
            } else if (req.method === 'PUT') {
                accessMethod = 'update'
            } else if (req.method === 'DELETE') {
                accessMethod = 'delete'
            } else {
                accessMethod = ''
            }
            switch (accessMethod) {
                case 'create':
                    if (getUserDetails.role[accessPageName].create === true) {
                        next();
                    } else {
                        if (newObj[accessPageName].create === true) {
                            next();
                        } else {
                            accessMethod
                            return unAuthorized(res);
                        }
                    }
                    break;
                case 'view':
                    if (getUserDetails.role[accessPageName].view === true) {
                        next();
                    } else {
                        if (newObj[accessPageName].view === true) {
                            next();
                        } else {
                            return unAuthorized(res);
                        }
                    }
                    break;
                case 'delete':
                    if (getUserDetails.role[accessPageName].delete === true) {
                        next();
                    } else {
                        if (newObj[accessPageName].delete === true) {
                            next();
                        } else {
                            return unAuthorized(res);
                        }
                    }
                    break;
                case 'update':
                    if (getUserDetails.role[accessPageName].update === true) {
                        next();
                    } else {
                        if (newObj[accessPageName].update === true) {
                            next();
                        } else {
                            return unAuthorized(res);
                        }
                    }
                    break;
                default:
                    return unAuthorized(res);
            }
        }

    } catch (err) {
        console.log(err);
        return handleError({ res, statusCode: 500, err: 'role base access authorization failed' });
    }
}