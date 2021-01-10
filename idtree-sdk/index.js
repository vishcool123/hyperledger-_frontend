const axios = require('axios')

module.exports = {
	generateUniqueID: async (apiKey) => {
		try {
			const apiCall = {
				method: 'post',
				url: 'http://3.23.128.15:3000/api/v1/users/generateUniqueIdwithKey',
				data: {
					apiKey: `${apiKey}`,
				},
			}
			const response = await axios(apiCall)
			if (response.status === 200) {
				const UniqueID = {
					status: response.status,
					uniqueID: response.data.data.uniqueID.uniqueID,
					privateKey: response.data.data.uniqueID.privateKey,
				}
				return UniqueID
			}
			const errorMsg = {
				status: response.status,
				errorMsg: 'Error while Connecting SDK to Blockchain',
				data: response.data,
			}
			return errorMsg
		} catch (error) {
			const errorMsg = {
				status: error.response.status,
				error: error.response.data.data,
				data: error.response.data,
			}
			return errorMsg
		}
	},
}
