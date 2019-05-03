const db = require('../helpers/postgres');
const queries = require('./sql/queries');

class ClientModel {
	// Returns a list of clients
	static async getList(search = {}) {
		return db.any(queries.clients.get, search);
	}

	// Returns Client by ID
	static async getOne(clientId) {
		return db.one(queries.clients.getOne, { clientId })
			.then(client => { return client })
			.catch(error =>
			 console.error("Data can not be retrieved for client Id: " +
			 							 clientId + "\n" + error.message));
	}

	// Create client
	static async createOne(clientData) {
		return db.one(queries.clients.createOne, clientData);
	}

	// Delete Client by id
	static async deleteById(clientId) {
		return db.none(queries.clients.deleteOne, { clientId })
				.then(console.log("Client Id: " + clientId +
													" was deleted successfully."))
				.catch(error =>
					console.error("Error occured while deleting " +
												clientId + " from the database.\n" + error.message));
	}

	// Update client by id
	static async updateById(clientData) {
		return db.none(queries.clients.updateOne, clientData)
			.then(result);
	}

}

module.exports = ClientModel;
