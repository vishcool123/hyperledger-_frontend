#!/bin/bash
rm -rf channel-artifacts/*
export FABRIC_CFG_PATH=$PWD
configtxgen -outputBlock channel-artifacts/genesis.block -channelID ordererchannel -profile OrdererChannel
configtxgen -outputCreateChannelTx channel-artifacts/idtreechannel.tx -channelID idtreechannel -profile idtreechannel
configtxgen --outputAnchorPeersUpdate channel-artifacts/superadminAnchor.tx -channelID idtreechannel -profile idtreechannel -asOrg superadminMSP
configtxgen --outputAnchorPeersUpdate channel-artifacts/usersAnchor.tx -channelID idtreechannel -profile idtreechannel -asOrg usersMSP
