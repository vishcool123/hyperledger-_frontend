const Users = require('../../models/userModel');
const enrollAdmin = require('../../sdk/enrollAdmin');
const registerFabricUser = require('../../sdk/registerUser');
const invokeChaincode = require('../../sdk/invoke');
const queryChaincode = require('../../sdk/query');
const {
  channelName,
  contractName,
  functionNames,
} = require('../../config/couchConfig').UniqueIDChaincode;

const logger = require('../../config/logger');
const { update } = require('../../models/userModel');

module.exports = {
  // Enroll Admin needs to be called only once
  addAdmin: async (org) => {
    logger.info('Inside Enroll Admin Service');
    try {
      const enroll = await enrollAdmin.enrollAdmin(org);
      return enroll;
    } catch (error) {
      logger.error('error', error);
      throw error;
    }
  },
  registerUser: async (fields) => {
    logger.info('Inside Register User Service');
    try {
      const addUser = await Users.create(fields);
      return addUser;
    } catch (error) {
      logger.error(`${error}`);
      return error;
    }
  },
  generateUniqueId: async (org, id) => {
    logger.info('Inside generate Unique Id Service');
    try {
      const generateUniqueId = await registerFabricUser.registerUser(org, id);
      // const addUser = await Users.create(fields);
      return generateUniqueId;
    } catch (error) {
      logger.error('error', error);
      throw error;
    }
  },
  getUser: async (email) => {
    logger.info('Inside get User Service');
    try {
      const query = await Users.findOne({ email });
      return query;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  findUserByAPIKey: async (apiKey) => {
    logger.info('Inside get User Service');
    try {
      const user = await Users.find({ apiKey });
      return user;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  updateUsersAPICalls: async (email) => {
    logger.info('Inside updateUser Details Service');
    try {
      const query = await Users.findOneAndUpdate(
        { email },
        { $inc: { apiCalls: 1 } },
        { new: true },
      );

      return query;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  fetchTotalAPICalls: async () => {
    logger.info('Inside fetchTotalAPICalls Service');
    try {
      const platformUsers = await Users.aggregate([
        {
          $group: {
            _id: null,
            count: {
              $sum: {
                $cond: [
                  {
                    $ne: ['$email', 'nonusers@idtree.com'],
                  },
                  '$apiCalls',
                  0,
                ],
              },
            },
          },
        },
      ]);

      const nonPlatformUsers = await Users.findOne({
        email: 'nonusers@idtree.com',
      });

      return { platformUsers, nonPlatformUsers };
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  manageUserAccess: async (email) => {
    logger.info('Inside manageUser access Service');
    try {
      const user = await Users.find({ email });

      const updateIsBlacklisted = !user[0].isBlacklisted;

      const query = await Users.findOneAndUpdate(
        { email },
        { isBlacklisted: updateIsBlacklisted },
        { new: true },
      );
      return query;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  getAllBlacklistedUser: async () => {
    logger.info('Inside getAllBlacklistedUser Service');
    try {
      const query = await Users.find({ isBlacklisted: true });
      return query;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  getAllUser: async () => {
    logger.info('Inside getAllUser Service');
    try {
      const query = await Users.find({ isAdmin: false });
      return query;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  getAllAdminUser: async () => {
    logger.info('Inside getAllAdminUser Service');
    try {
      const query = await Users.find({ isAdmin: true });
      return query;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  },
  createHyperledgerUniqueID: async (org, username, arguments) => {
    logger.info('Inside create Hyperledger Unique Service');
    try {
      let invoke = await invokeChaincode.invokeChaincode(
        org,
        username,
        channelName,
        contractName,
        functionNames.createUniqueId,
        arguments,
      );
      return invoke;
    } catch (error) {
      logger.error('error', error);
      throw error;
    }
  },
  queryHyperledgerUniqueID: async (org, username, uniqueId) => {
    logger.info('Inside Query Hyperledger UniqueID Service');
    try {
      let query = await queryChaincode.queryDetails(
        org,
        username,
        channelName,
        contractName,
        functionNames.queryUniqueIdData,
        uniqueId,
      );
      return JSON.parse(query);
    } catch (error) {
      logger.error('error', error);
      throw error;
    }
  },
};
