const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const { Wallets } = require('fabric-network');
// eslint-disable-next-line node/no-unpublished-require
const logger = require('../config/logger');
// eslint-disable-next-line node/no-unpublished-require
const { CouchDBWalletConfig } = require('../config/couchConfig');

module.exports.registerUser = async (org, username) => {
  try {
    // Change the folder name to live/staging to connect the SDK to respective Server
    const ccpPath = path.resolve(
      __dirname,
      'connection',
      `connection-${org}.json`,
    );
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new CA client for interacting with the CA.
    const caURL = ccp.certificateAuthorities[`ca.${org}.idtree.com`].url;
    const ca = new FabricCAServices(caURL);

    // Couchdb wallet
    const wallet = await Wallets.newCouchDBWallet(CouchDBWalletConfig.url, org);

    // Check to see if we've already enrolled the user.
    const userIdentity = await wallet.get(username);
    if (userIdentity) {
      logger.info(
        'An identity for the user ',
        username,
        ' already exists in the wallet',
      );
      return {
        err: `An identity for the user: ${username}, already exists in hyperledger.`,
      };
    }
    logger.info('continue if user already exists.');
    // Check to see if we've already enrolled the admin user.
    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
      //   logger.info('An identity for the admin user "admin" does not exist in the wallet');
      //   logger.info('Run the enrollAdmin.js before retrying');
      throw {
        err:
          'An identity for the admin user "admin" does not exist in the wallet',
      };
    }

    // build a user object for authenticating with the CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register(
      {
        affiliation: 'org1.department1',
        enrollmentID: username,
        role: 'client',
      },
      adminUser,
    );
    const enrollment = await ca.enroll({
      enrollmentID: username,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: `${org}MSP`,
      type: 'X.509',
    };
    await wallet.put(username, x509Identity);
    logger.info(
      'Successfully registered and enrolled admin user ',
      username,
      ' and imported it into the wallet',
    );

    return {
      msg: 'Successfully enrolled',
      x509: x509Identity,
    };
  } catch (error) {
    // console.error(`Failed to register user : ${error}`);
    // process.exit(1);
    throw { err: error };
  }
};
