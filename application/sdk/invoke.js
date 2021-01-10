const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');
const { CouchDBWalletConfig } = require('../config/couchConfig');

module.exports.invokeChaincode = async (
  org,
  username,
  channelName,
  contractName,
  functionName,
  arguments,
) => {
  try {
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

    const arrayOfArgs = Object.values(arguments);
    console.log('args-> ', arrayOfArgs, typeof arrayOfArgs.join());
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(username);
    if (!identity) {
      logger.info(
        `An identity for the user ${username} does not exist in the wallet`,
      );
      throw { msg: 'An identity for the user does not exist in the wallet' };
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

    let data = await contract.submitTransaction(functionName, ...arrayOfArgs);
    // Disconnect from the gateway.
    await gateway.disconnect();
    logger.info(
      `User : ${username}, successfully submitted transaction on the blockchain.`,
    );
    // logger.info(JSON.parse(data))
    return data;
  } catch (error) {
    logger.error(`Failed to submit transaction: ${error}`);
    // process.exit(1);
    throw error;
  }
};
