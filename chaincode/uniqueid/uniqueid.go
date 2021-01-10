package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type UniqueId struct {
	UNIQUEID  string `json:"uniqueId"`
	CREATEDBY string `json:"createdBy"`
	APIKEY    string `json:"apiKey"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	// Key    string `json:"Key"`
	Record *UniqueId
}

func (s *SmartContract) CreateUniqueId(ctx contractapi.TransactionContextInterface, uniqueId string, createdBy string, apiKey string) (string, error) {
	uniqueid := UniqueId{
		UNIQUEID:  uniqueId,
		CREATEDBY: createdBy,
		APIKEY:    apiKey,
	}
	uniqueIdAsBytes, _ := json.Marshal(uniqueid)
	err := ctx.GetStub().PutState(uniqueId, uniqueIdAsBytes)
	if err != nil {
		return "", fmt.Errorf("Failed to PutState into Network with error: " + err.Error())
	}
	return "UniqueId created", nil
}

//Query UniqueId Data
func (s *SmartContract) QueryUniqueIdData(ctx contractapi.TransactionContextInterface, id string) (*UniqueId, error) {
	uniqueIdAsBytes, err := ctx.GetStub().GetState(id)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if uniqueIdAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", id)
	}

	uniqueid := new(UniqueId)
	_ = json.Unmarshal(uniqueIdAsBytes, uniqueid)

	return uniqueid, nil
}

// QueryAllUniqueIds give all uniqueid details
func (s *SmartContract) QueryAllUniqueIds(ctx contractapi.TransactionContextInterface) ([]UniqueId, error) {
	queryString := fmt.Sprintf("{\"selector\":{}}}")
	resultIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, fmt.Errorf("Enter valid details")
	}
	defer resultIterator.Close()
	results := []UniqueId{}
	for resultIterator.HasNext() {
		queryResponse, err := resultIterator.Next()
		if err != nil {
			return nil, fmt.Errorf("Enter valid details")
		}

		w := new(UniqueId)
		_ = json.Unmarshal(queryResponse.Value, w)
		results = append(results, *w)
	}
	return results, nil
}

func main() {

	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting chaincode: %s", err.Error())
	}
}
