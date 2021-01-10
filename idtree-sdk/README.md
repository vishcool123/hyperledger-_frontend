<h1 align="center">Welcome to idtree-sdk</h1>
<p>
  <a href="https://www.npmjs.com/package/idtree-sdk" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/idtree-sdk.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> SDK to Interact with IDTree Hyperledger Network and generate UniqueIDs

- To Get an API-KEY Please Register
- Once You Register You will receive an `apiKey`
- You can use that `apiKey` in our `idtree-sdk`, intruction given below

## Install

```sh
npm install idtree-sdk
```

## Usage

```sh
const generateId = require('idtree-sdk')
const apiKey = `YOUR_API_KEY` //received after registration
const id = await generateId.generateUniqueID(apiKey)
```

## Example Responses

```sh
- On Success:
  {
    status: 200,
    uniqueID: '06F608371B194EB968D202DA82E93FD9C3F96F27',
    privateKey: '-----BEGIN PRIVATE KEY-----MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgIPCf+W56LOUGhwRewwVKt9SFXxWH+jxzO0iI30NZpiGhRANCAAQXzGjR87ixS8jaVsJmA2/At5DPhZ8TZTdRlLgWhcfVwiPJAnSAYbVv6g2TbYpOewhjOjgIppwRurCbUby58N2d-----END PRIVATE KEY-----'
  }

- On Error:
  {
    status: 401,
    error: 'Invalid API Key',
    data: {
      result: 0,
      msg: 'error',
      data: 'Invalid API Key'
    }
  }
```

---

_IDTree SDK to Interact with IDTree Hyperledger Fabric Blockchain Network_
