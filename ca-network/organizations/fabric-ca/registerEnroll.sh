

function createsuperadmin {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p organizations/peerOrganizations/superadmin.idtree.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/superadmin.idtree.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-superadmin --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-superadmin.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-superadmin.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-superadmin.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-superadmin.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/msp/config.yaml

  echo
	echo "Register peer0"
  echo
  set -x
	fabric-ca-client register --caname ca-superadmin --id.name peer0 --id.secret peer0pw --id.type peer --id.attrs '"hf.Registrar.Roles=peer"' --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  echo
	echo "Register peer1"
  echo
  set -x
	fabric-ca-client register --caname ca-superadmin --id.name peer1 --id.secret peer1pw --id.type peer --id.attrs '"hf.Registrar.Roles=peer"' --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  echo
  echo "Register user"
  echo
  set -x
  fabric-ca-client register --caname ca-superadmin --id.name user1 --id.secret user1pw --id.type client --id.attrs '"hf.Registrar.Roles=client"' --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  echo
  echo "Register the org admin"
  echo
  set -x
  fabric-ca-client register --caname ca-superadmin --id.name superadminadmin --id.secret superadminadminpw --id.type admin --id.attrs '"hf.Registrar.Roles=admin"' --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

	mkdir -p organizations/peerOrganizations/superadmin.idtree.com/peers
  mkdir -p organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com
  mkdir -p organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com

  echo
  echo "## Generate the peer0 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-superadmin -M ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/msp --csr.hosts peer0.superadmin.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/msp/config.yaml

  echo
  echo "## Generate the peer1 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer1:peer1pw@localhost:7054 --caname ca-superadmin -M ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/msp --csr.hosts peer1.superadmin.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/msp/config.yaml

  echo
  echo "## Generate the peer0-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-superadmin -M ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls --enrollment.profile tls --csr.hosts peer0.superadmin.idtree.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x


  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/server.key

  mkdir ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/msp/tlscacerts/ca.crt

  mkdir ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/tlsca/tlsca.idtree.com-cert.pem

  mkdir ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/ca
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer0.superadmin.idtree.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/ca/ca.idtree.com-cert.pem

  echo
  echo "## Generate the peer1-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer1:peer1pw@localhost:7054 --caname ca-superadmin -M ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls --enrollment.profile tls --csr.hosts peer1.superadmin.idtree.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x


  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/peers/peer1.superadmin.idtree.com/tls/server.key

  mkdir -p organizations/peerOrganizations/superadmin.idtree.com/users
  mkdir -p organizations/peerOrganizations/superadmin.idtree.com/users/User1@superadmin.idtree.com

  echo
  echo "## Generate the user msp"
  echo
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-superadmin -M ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/users/User1@superadmin.idtree.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  mkdir -p organizations/peerOrganizations/superadmin.idtree.com/users/Admin@superadmin.idtree.com

  echo
  echo "## Generate the org admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://superadminadmin:superadminadminpw@localhost:7054 --caname ca-superadmin -M ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/users/Admin@superadmin.idtree.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/superadmin/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/superadmin.idtree.com/users/Admin@superadmin.idtree.com/msp/config.yaml

}


function createusers {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p organizations/peerOrganizations/users.idtree.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/users.idtree.com/
#  rm -rf $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml
#  rm -rf $FABRIC_CA_CLIENT_HOME/msp

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-users --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-users.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-users.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-users.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-users.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/config.yaml

  echo
	echo "Register peer0"
  echo
  set -x
	fabric-ca-client register --caname ca-users --id.name peer0 --id.secret peer0pw --id.type peer --id.attrs '"hf.Registrar.Roles=peer"' --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  echo
	echo "Register peer1"
  echo
  set -x
	fabric-ca-client register --caname ca-users --id.name peer1 --id.secret peer1pw --id.type peer --id.attrs '"hf.Registrar.Roles=peer"' --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  echo
  echo "Register user"
  echo
  set -x
  fabric-ca-client register --caname ca-users --id.name user1 --id.secret user1pw --id.type client --id.attrs '"hf.Registrar.Roles=client"' --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  echo
  echo "Register the org admin"
  echo
  set -x
  fabric-ca-client register --caname ca-users --id.name usersadmin --id.secret usersadminpw --id.type admin --id.attrs '"hf.Registrar.Roles=admin"' --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

	mkdir -p organizations/peerOrganizations/users.idtree.com/peers
  mkdir -p organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com
  mkdir -p organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com

  echo
  echo "## Generate the peer0 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-users -M ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/msp --csr.hosts peer0.users.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/msp/config.yaml

  echo
  echo "## Generate the peer1 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer1:peer1pw@localhost:8054 --caname ca-users -M ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/msp --csr.hosts peer1.users.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/msp/config.yaml


  echo
  echo "## Generate the peer0-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-users -M ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls --enrollment.profile tls --csr.hosts peer0.users.idtree.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x


  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/server.key

  mkdir ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/tlscacerts/ca.crt

  mkdir ${PWD}/organizations/peerOrganizations/users.idtree.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/tlsca/tlsca.users.idtree.com-cert.pem

  mkdir ${PWD}/organizations/peerOrganizations/users.idtree.com/ca
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/ca/ca.users.idtree.com-cert.pem


  echo
  echo "## Generate the peer1-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer1:peer1pw@localhost:8054 --caname ca-users -M ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls --enrollment.profile tls --csr.hosts peer1.users.idtree.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x


  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer1.users.idtree.com/tls/server.key

  # mkdir ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/tlscacerts
  # cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/tlscacerts/ca.crt

  # mkdir ${PWD}/organizations/peerOrganizations/users.idtree.com/tlsca
  # cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/tlsca/tlsca.users.idtree.com-cert.pem

  # mkdir ${PWD}/organizations/peerOrganizations/users.idtree.com/ca
  # cp ${PWD}/organizations/peerOrganizations/users.idtree.com/peers/peer0.users.idtree.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/users.idtree.com/ca/ca.users.idtree.com-cert.pem

  mkdir -p organizations/peerOrganizations/users.idtree.com/users
  mkdir -p organizations/peerOrganizations/users.idtree.com/users/User1@users.idtree.com

  echo
  echo "## Generate the user msp"
  echo
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-users -M ${PWD}/organizations/peerOrganizations/users.idtree.com/users/User1@users.idtree.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  mkdir -p organizations/peerOrganizations/users.idtree.com/users/Admin@users.idtree.com

  echo
  echo "## Generate the org admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://usersadmin:usersadminpw@localhost:8054 --caname ca-users -M ${PWD}/organizations/peerOrganizations/users.idtree.com/users/Admin@users.idtree.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/users/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/users.idtree.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/users.idtree.com/users/Admin@users.idtree.com/msp/config.yaml

}

function createOrderer {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p organizations/ordererOrganizations/idtree.com

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/idtree.com
#  rm -rf $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml
#  rm -rf $FABRIC_CA_CLIENT_HOME/msp

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml


  echo
	echo "Register orderer"
  echo
  set -x
	fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --id.attrs '"hf.Registrar.Roles=orderer"' --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo
	echo "Register ordere2"
  echo
  set -x
	fabric-ca-client register --caname ca-orderer --id.name orderer2 --id.secret orderer2pw --id.type orderer --id.attrs '"hf.Registrar.Roles=orderer"' --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo
	echo "Register orderer3"
  echo
  set -x
	fabric-ca-client register --caname ca-orderer --id.name orderer3 --id.secret orderer3pw --id.type orderer --id.attrs '"hf.Registrar.Roles=orderer"' --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo
	echo "Register orderer4"
  echo
  set -x
	fabric-ca-client register --caname ca-orderer --id.name orderer4 --id.secret orderer4pw --id.type orderer --id.attrs '"hf.Registrar.Roles=orderer"' --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo
	echo "Register orderer5"
  echo
  set -x
	fabric-ca-client register --caname ca-orderer --id.name orderer5 --id.secret orderer5pw --id.type orderer --id.attrs '"hf.Registrar.Roles=orderer"' --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo
  echo "Register the orderer admin"
  echo
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --id.attrs '"hf.Registrar.Roles=admin"' --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

	mkdir -p organizations/ordererOrganizations/idtree.com/orderers
  mkdir -p organizations/ordererOrganizations/idtree.com/orderers/idtree.com

  mkdir -p organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com
  mkdir -p organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com
  mkdir -p organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com
  mkdir -p organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com
  mkdir -p organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com

  echo
  echo "## Generate the orderer msp"
  echo
  set -x
	fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp --csr.hosts orderer.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/config.yaml

  echo
  echo "## Generate the orderer2 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://orderer2:orderer2pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/msp --csr.hosts orderer2.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/msp/config.yaml

  echo
  echo "## Generate the orderer3 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://orderer3:orderer3pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/msp --csr.hosts orderer3.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/msp/config.yaml

  echo
  echo "## Generate the orderer4 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://orderer4:orderer4pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/msp --csr.hosts orderer4.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/msp/config.yaml

  echo
  echo "## Generate the orderer5 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://orderer5:orderer5pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/msp --csr.hosts orderer5.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/msp/config.yaml

  echo
  echo "## Generate the orderer-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls --enrollment.profile tls --csr.hosts orderer.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/server.key

  mkdir ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

  mkdir ${PWD}/organizations/ordererOrganizations/idtree.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/msp/tlscacerts/tlsca.idtree.com-cert.pem

  echo
  echo "## Generate the orderer2-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer2:orderer2pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls --enrollment.profile tls --csr.hosts orderer2.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer2.idtree.com/tls/server.key

  echo
  echo "## Generate the orderer3-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer3:orderer3pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls --enrollment.profile tls --csr.hosts orderer3.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer3.idtree.com/tls/server.key

  echo
  echo "## Generate the orderer4-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer4:orderer4pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls --enrollment.profile tls --csr.hosts orderer4.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer4.idtree.com/tls/server.key

  echo
  echo "## Generate the orderer5-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer5:orderer5pw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls --enrollment.profile tls --csr.hosts orderer5.idtree.com --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/idtree.com/orderers/orderer5.idtree.com/tls/server.key

  mkdir -p organizations/ordererOrganizations/idtree.com/users
  mkdir -p organizations/ordererOrganizations/idtree.com/users/Admin@superadmin.idtree.com

  echo
  echo "## Generate the admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/idtree.com/users/Admin@superadmin.idtree.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/idtree.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/idtree.com/users/Admin@superadmin.idtree.com/msp/config.yaml

}
