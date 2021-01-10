peer lifecycle chaincode package uniqueid.tar.gz --path github.com/hyperledger/fabric-samples/chaincode/uniqueid --lang golang --label $1

export CORE_PEER_LOCALMSPID=superadminMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/users/Admin@superadmin.idtree.com/msp
export CORE_PEER_ADDRESS=peer0.superadmin.idtree.com:7051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

peer lifecycle chaincode install uniqueid.tar.gz
export CCID=$(peer lifecycle chaincode queryinstalled | cut -d ' ' -f 3 | sed s/.$// | grep $1)
peer lifecycle chaincode approveformyorg --package-id $CCID --channelID idtreechannel --name uniqueid --version 1 --sequence $2 --waitForEvent --tls --cafile $ORDERER_CA
peer lifecycle chaincode checkcommitreadiness --channelID idtreechannel --name uniqueid --version 1  --sequence $2 --tls --cafile $ORDERER_CA

export CORE_PEER_LOCALMSPID=usersMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/users.idtree.com/users/Admin@users.idtree.com/msp
export CORE_PEER_ADDRESS=peer0.users.idtree.com:9051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

peer lifecycle chaincode install uniqueid.tar.gz
export CCID=$(peer lifecycle chaincode queryinstalled | cut -d ' ' -f 3 | sed s/.$// | grep $1)
peer lifecycle chaincode approveformyorg --package-id $CCID --channelID idtreechannel --name uniqueid --version 1 --sequence $2 --waitForEvent --tls --cafile $ORDERER_CA
peer lifecycle chaincode checkcommitreadiness --channelID idtreechannel --name uniqueid --version 1  --sequence $2 --tls --cafile $ORDERER_CA

export CORE_PEER_LOCALMSPID=superadminMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/users/Admin@superadmin.idtree.com/msp
export CORE_PEER_ADDRESS=peer0.superadmin.idtree.com:7051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

peer lifecycle chaincode commit -o orderer.idtree.com:7050 --channelID idtreechannel --name uniqueid --version 1 --sequence $2 --tls true --cafile $ORDERER_CA --peerAddresses peer0.superadmin.idtree.com:7051 --peerAddresses peer0.users.idtree.com:9051  --tlsRootCertFiles ./crypto/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/ca.crt --tlsRootCertFiles ./crypto/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/ca.crt
