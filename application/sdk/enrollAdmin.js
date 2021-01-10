const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');
const { CouchDBWalletConfig } = require('../config/couchConfig');

module.exports.enrollAdmin = async (org) => {
  try {
    // load the network configuration

    // Change the folder name to development/staging to connect the SDK to respective Server
    const ccpPath = path.resolve(
      __dirname,
      'connection',
      `connection-${org}.json`,
    );
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities[`ca.${org}.idtree.com`];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName,
    );

    // Couchdb wallet
    const wallet = await Wallets.newCouchDBWallet(
      CouchDBWalletConfig.url,
      org.toLowerCase(),
    );

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get('admin');
    if (identity) {
      logger.info(
        'An identity for the admin user "admin" already exists in the wallet',
      );
      return {
        msg:
          'An identity for the admin user "admin" already exists in the wallet',
      };
    }
    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: 'admin',
      enrollmentSecret: 'adminpw',
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: `${org}MSP`,
      type: 'X.509',
    };
    await wallet.put('admin', x509Identity);
    logger.info(
      'Successfully enrolled admin user "admin" and imported it into the wallet',
    );
    return {
      msg:
        "Successfully enrolled admin user 'admin' and imported it into the wallet",
    };
  } catch (error) {
    throw error;
  }
};
