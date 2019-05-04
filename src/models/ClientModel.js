const db = require('../helpers/postgres');
const queries = require('./sql/queries');

/**
* Handle CRUD operations in the database for client management
*/
class ClientModel {
	/**
	* Get a list of clients from the databse
	* @param {array} search empty array
	* @return {array} Array of client objects
	*/
	static async getClientsList(search = {}) {
		return db.any(queries.clients.get, search);
	}

	/**
	* Get client details from the database to a given client id
	* @param {string} clientId client id
	* @return {object} Client details
	*/
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

	/**
	* Create a client in the database by assigning the given details
	* @param {object} clientData client details
	* @return {object} Success/error message
	*/
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

	/**
	* Delete a client from the database of a given client id
	* @param {object} clientId clientId
	* @return {object} Success/error message
	*/
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

	/**
	* Update a client in the database for the given details
	* @param {object} clientData client details
	* @return {object} Success/error message
	*/
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
