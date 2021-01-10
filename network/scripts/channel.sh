#!/bin/bash

export CORE_PEER_LOCALMSPID=superadminMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/superadmin.idtree.com/users/Admin@superadmin.idtree.com/msp
export CORE_PEER_ADDRESS=peer0.superadmin.idtree.com:7051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

peer channel create -f channel-artifacts/idtreechannel.tx -c idtreechannel -o orderer.idtree.com:7050 --tls --cafile $ORDERER_CA
peer channel join -b idtreechannel.block
peer channel update -o orderer.idtree.com:7050 -c idtreechannel -f channel-artifacts/superadminAnchor.tx --tls --cafile $ORDERER_CA

export CORE_PEER_LOCALMSPID=usersMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/users.idtree.com/users/Admin@users.idtree.com/msp
export CORE_PEER_ADDRESS=peer0.users.idtree.com:9051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

peer channel join -b idtreechannel.block
peer channel update -o orderer.idtree.com:7050 -c idtreechannel -f channel-artifacts/usersAnchor.tx --tls --cafile $ORDERER_CA