peer chaincode invoke -o orderer.idtree.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem -C idtreechannel -n uniqueid --peerAddresses peer0.superadmin.idtree.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/ca.crt --peerAddresses peer0.users.idtree.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/ca.crt -c '{"function":"CreateUniqueId","Args":["123412341234","test@chaincode.com","1234-12334-555-455"]}'


peer chaincode query -C idtreechannel -n uniqueid -c '{"function":"QueryUniqueIdData","Args":["123412341234"]}'

peer chaincode query -C idtreechannel -n uniqueid -c '{"function":"QueryAllUniqueIds","Args":[""]}'