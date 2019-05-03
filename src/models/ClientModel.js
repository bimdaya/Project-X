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
			.then(client => { return client })
			.catch(error =>
				console.error("Data can not be retrieved for client Id: " +
			 							 clientId + "\n" + error.message));
	}

	// Create client
	static async createClient(clientData) {
		return db.one(queries.clients.createOne, clientData)
			.then(clientData => { const clientId = clientData.client;
														console.log("Client Id: " + clientId +
																			  " was created successfully.");
														return clientId; })
			.catch(error =>
				console.error("Error occured while creating client with" +
											" first name: " + clientData.firstname +
											" surname: " + clientData.surname +
											" phone number: " + clientData.phonenumber +
											" to the database.\n" + error.message));
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
		let clientId = clientData.id;
		return db.none(queries.clients.updateOne, clientData)
			.then(console.log("Client Id: " + clientId +
												" was updated successfully."))
			.catch(error =>
				console.error("Error occured while updating " +
											clientId + " in the database.\n" + error.message));
	}

}

module.exports = ClientModel;
