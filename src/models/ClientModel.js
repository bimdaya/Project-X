const db = require('../helpers/postgres');
const queries = require('./sql/queries');

class ClientModel {
	// Returns a list of clients
	static async getClientsList(search = {}) {
		return db.any(queries.clients.get, search);
	}

	// Returns Client by ID
	static async getClientById(clientId) {
		return db.one(queries.clients.getOne, { clientId })
			.then((client) => {
				if (client === undefined) {
					return { errMessage: `No data found under client Id ${clientId}` };
				}
				return client;
			})
			.catch((errObject) => {
				const error = {
					errCode: errObject.code,
					errMessage: errObject.message,
				};
				return error;
			});
	}

	// Create client
	static async createClient(clientData) {
		return db.one(queries.clients.createOne, clientData)
			.then((client) => {
				const clientId = { id: client.client };
				return clientId;
			})
			.catch((errObject) => {
				const error = {
					errCode: errObject.code,
					errMessage: errObject.message,
				};
				return error;
			});
	}

	// Delete Client by id
	static async deleteById(clientId) {
		return db.none(queries.clients.deleteOne, { clientId })
			.catch((errObject) => {
				const error = {
					errCode: errObject.code,
					errMessage: errObject.message,
				};
				return error;
			});
	}

	// Update client by id
	static async updateById(clientData) {
		return db.none(queries.clients.updateOne, clientData)
			.catch((errObject) => {
				const error = {
					errCode: errObject.code,
					errMessage: errObject.message,
				};
				return error;
			});
	}

}

module.exports = ClientModel;
