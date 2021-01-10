module.exports = {
  UniqueIDChaincode: {
    channelName: 'idtreechannel',
    contractName: 'uniqueid',
    functionNames: {
      createUniqueId: 'CreateUniqueId',
      queryUniqueIdData: 'QueryUniqueIdData',
      queryAllUniqueIds: 'QueryAllUniqueIds',
    },
  },
  CouchDBWalletConfig: {
    url: 'http://admin:adminpw@localhost:9984',
    db: 'idtree',
  },
};
