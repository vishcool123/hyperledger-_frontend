/* eslint-disable node/no-unpublished-require */
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const logger = require('../config/logger');
const { CouchDBWalletConfig } = require('../config/couchConfig');

module.exports.queryDetails = async (
  org,
  username,
  channelName,
  contractName,
  functionName,
  uniqueId,
) => {
  try {
    // load the network configuration
    // Change the folder name to live/staging to connect the SDK to respective Server
    const ccpPath = path.resolve(
      __dirname,
      'connection',
      `connection-${org}.json`,
    );
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Couchdb wallet
    const wallet = await Wallets.newCouchDBWallet(CouchDBWalletConfig.url, org);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(username);
    if (!identity) {
      //   logger.info('An identity for the user ',username,' does not exist in the wallet');
      //   logger.info('Run the registerUser.js application before retrying');
      throw `An identity for the user: ${username}, does not exist in the wallet`;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: username,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(contractName);

    /* -----------------QueryWallet Details
            await contract.evaluateTransaction('QueryWalletData','UniqueId')
    */
    const result = await contract.evaluateTransaction(functionName, uniqueId);
    logger.info(
      `Transaction has been evaluated, result is: ${result.toString()}`,
    );
    return result.toString();
  } catch (error) {
    // console.error(`Failed to evaluate transaction: ${error}`);
    // eslint-disable-next-line no-process-exit
    // process.exit(1);
    throw error;
  }
};
