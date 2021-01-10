/* eslint-disable radix */
const x509 = require('x509');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const salt = 10; // any random value

const logger = require('../../config/logger');
const {
  addAdmin,
  generateUniqueId,
  registerUser,
  getUser,
  findUserByAPIKey,
  updateUsersAPICalls,
  fetchTotalAPICalls,
  manageUserAccess,
  getAllBlacklistedUser,
  getAllUser,
  getAllAdminUser,
  createHyperledgerUniqueID,
} = require('../../services/v1/users');
const { handleError, handleResponse } = require('../../config/requestHandler');

module.exports = {
  registerUser: async (req, res) => {
    logger.info('Inside Register User Controller');
    try {
      const { email, password } = req.body;
      const apiKey = uuidv4();
      const encryptedPassword = await bcrypt.hash(password, salt);
      const fields = {
        email,
        password: encryptedPassword,
        apiKey,
      };
      const regUser = await registerUser(fields);
      if (regUser.name === 'MongoError' && regUser.code === 11000) {
        return handleError({
          res,
          statusCode: 409,
          err: 'Email Already Exist',
          data: regUser.name,
        });
      }
      const resp = {
        apiKey,
        msg: 'User Registered',
        isAdmin: regUser.isAdmin,
        isBlacklisted: regUser.isBlacklisted,
        apiCalls: regUser.apiCalls,
      };
      return handleResponse({
        res,
        data: resp,
      });
    } catch (error) {
      logger.error(`${error}`);
      return handleError({
        res,
        statusCode: 401,
        err: 'Register User Failed',
        data: error,
      });
    }
  },
  addAdminUser: async (req, res) => {
    logger.info('Inside Add Admin User Controller');
    try {
      const { email, password } = req.body;
      const apiKey = uuidv4();

      const encryptedPassword = await bcrypt.hash(password, salt);
      const fields = {
        email,
        password: encryptedPassword,
        apiKey,
        isAdmin: true,
      };
      const regUser = await registerUser(fields);
      if (regUser.name === 'MongoError' && regUser.code === 11000) {
        return handleError({
          res,
          statusCode: 409,
          err: 'Email Already Exist',
          data: regUser.name,
        });
      }
      const resp = {
        msg: 'Admin Registered',
        isAdmin: regUser.isAdmin,
      };
      return handleResponse({
        res,
        data: resp,
      });
    } catch (error) {
      logger.error(`${error}`);
      return handleError({
        res,
        statusCode: 401,
        err: 'Register User Failed',
        data: error,
      });
    }
  },
  userLogin: async (req, res) => {
    logger.info('Inside Login Controller');
    try {
      const { email, password } = req.body;
      const user = await getUser(email);
      const login = await bcrypt.compare(password, user.password);
      if (!login) {
        return handleError({
          res,
          statusCode: 401,
          err: 'Incorrect Password',
        });
      }
      return handleResponse({
        res,
        msg: 'User Logged-In Successfully',
        data: {
          email: user.email,
          isAdmin: user.isAdmin,
          apiKey: user.apiKey,
          isBlacklisted: user.isBlacklisted,
          apiCalls: user.apiCalls,
        },
      });
    } catch (error) {
      logger.error(`${error}`);
      return handleError({
        res,
        statusCode: 401,
        err: 'User Not Registered',
        data: error,
      });
    }
  },
  generateUniqueId: async (req, res) => {
    logger.info('Inside Create UniqueId Controller');
    try {
      const id = Math.floor(100000000 + Math.random() * 900000000).toString();
      const addUser = await generateUniqueId('users', id);
      if (addUser.err) {
        logger.error(addUser.err);
        return handleError({
          res,
          err: addUser.err,
        });
      }
      const certDetails = x509.parseCert(addUser.x509.credentials.certificate);
      const uniqueID = {
        uniqueID: certDetails.serial,
        privateKey: addUser.x509.credentials.privateKey.replace(
          /\r?\n|\r/g,
          '',
        ),
      };
      const updateAPICalls = await updateUsersAPICalls('nonusers@idtree.com');
      const hyperledgerUniqueID = await createHyperledgerUniqueID('users', id, [
        uniqueID.uniqueID,
        'nonusers@idtree.com',
        '-',
      ]);

      return handleResponse({
        res,
        msg: hyperledgerUniqueID.toString(),
        data: { uniqueID, totalAPICallsNonUsers: updateAPICalls.apiCalls },
      });
    } catch (error) {
      logger.error(`${error}`);
      return handleError({
        res,
        err: 'UniqueId creation Failed',
        data: error,
      });
    }
  },
  generateUniqueIdwithKey: async (req, res) => {
    logger.info('Inside Generate Unique Id with Key Controller');
    try {
      const { apiKey } = req.body;
      const user = await findUserByAPIKey(apiKey);
      if (user.length === 0) {
        return handleError({
          res,
          statusCode: 401,
          data: 'Invalid API Key',
        });
      }
      if (user[0].isBlacklisted === true) {
        return handleError({
          res,
          statusCode: 403,
          data: 'Your API Key is Blacklisted By Admin',
        });
      }
      const id = Math.floor(100000000 + Math.random() * 900000000).toString();
      const addUser = await generateUniqueId('users', id);
      if (addUser.err) {
        logger.error(addUser.err);
        return handleError({
          res,
          err: addUser.err,
        });
      }
      const certDetails = x509.parseCert(addUser.x509.credentials.certificate);
      const uniqueID = {
        uniqueID: certDetails.serial,
        privateKey: addUser.x509.credentials.privateKey.replace(
          /\r?\n|\r/g,
          '',
        ),
      };

      const updateAPICalls = await updateUsersAPICalls(user[0].email);
      const hyperledgerUniqueID = await createHyperledgerUniqueID('users', id, [
        uniqueID.uniqueID,
        user[0].email,
        apiKey,
      ]);
      return handleResponse({
        res,
        msg: hyperledgerUniqueID.toString(),
        data: { uniqueID, totalAPICalls: updateAPICalls.apiCalls },
      });
    } catch (error) {
      logger.error(`${error}`);
      return handleError({
        res,
        err: 'Unique Id creation Failed with API Key',
        data: error,
      });
    }
  },
  createHyperledgerAdmin: async (req, res) => {
    logger.info('Inside Create Hyperledger Admin Controller');
    try {
      const addSuperAdmin = await addAdmin('superadmin');
      const addUserAdmin = await addAdmin('users');
      const data = {
        addSuperAdmin,
        addUserAdmin,
      };
      handleResponse({
        res,
        data,
      });
    } catch (error) {
      logger.error(`${error}`);
      handleError({
        res,
        err: 'Error creating Admin User',
        data: error,
      });
    }
  },
  fetchTotalAPICalls: async (req, res) => {
    logger.info('Inside fetch total APIs Controller');
    try {
      const fetchAPICalls = await fetchTotalAPICalls();
      handleResponse({
        res,
        data: {
          platformUsers: fetchAPICalls.platformUsers[0].count,
          nonPlatformUsers: fetchAPICalls.nonPlatformUsers.apiCalls,
        },
      });
    } catch (error) {
      logger.error(`Controller: ${error}`);
      handleError({
        res,
        err: 'Error Fetching TotalAPIs Calls',
        data: error,
      });
    }
  },
  manageUserAccess: async (req, res) => {
    logger.info('Inside manageUserAccess Controller');
    try {
      const manageUser = await manageUserAccess(req.body.email);
      handleResponse({
        res,
        msg: 'User Access Updated',
        data: { isBlacklisted: manageUser.isBlacklisted },
      });
    } catch (error) {
      logger.error(`${error}`);
      handleError({
        res,
        err: 'Error managing user Access',
        data: error,
      });
    }
  },
  getAllBlacklistedUser: async (req, res) => {
    logger.info('Inside getAllBlacklistedUser Controller');
    try {
      const users = [];

      const blacklistedUsers = await getAllBlacklistedUser();
      blacklistedUsers.forEach((element) => {
        const obj = {
          email: element.email,
          apiCalls: element.apiCalls,
          isBlacklisted: element.isBlacklisted,
        };
        users.push(obj);
      });
      handleResponse({
        res,
        msg: 'List of Blacklisted Users',
        data: users,
      });
    } catch (error) {
      logger.error(`${error}`);
      handleError({
        res,
        err: 'Error Getting Blacklisted User',
        data: error,
      });
    }
  },
  getAllUser: async (req, res) => {
    logger.info('Inside getAllUser Controller');
    try {
      const users = [];

      const Users = await getAllUser();
      Users.forEach((element) => {
        const obj = {
          email: element.email,
          apiCalls: element.apiCalls,
          isBlacklisted: element.isBlacklisted,
        };
        users.push(obj);
      });
      handleResponse({
        res,
        msg: 'List of All Users',
        data: users,
      });
    } catch (error) {
      logger.error(`${error}`);
      handleError({
        res,
        err: 'Error Getting All User',
        data: error,
      });
    }
  },
  getAllAdminUser: async (req, res) => {
    logger.info('Inside getAllAdminUser Controller');
    try {
      const users = [];

      const Users = await getAllAdminUser();
      Users.forEach((element) => {
        const obj = {
          email: element.email,
          apiCalls: element.apiCalls,
          isBlacklisted: element.isBlacklisted,
        };
        users.push(obj);
      });
      handleResponse({
        res,
        msg: 'List of All Admin Users',
        data: users,
      });
    } catch (error) {
      logger.error(`${error}`);
      handleError({
        res,
        err: 'Error Getting All Admin User',
        data: error,
      });
    }
  },
};
