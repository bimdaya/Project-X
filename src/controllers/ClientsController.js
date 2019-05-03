const ClientModel = require('../models/ClientModel');
const validator = require('../helpers/validator');
const { NotFoundError } = require('../errors');

class ClientsController {
	// GET - Returns a list of clients
	static async get() {
		return ClientModel.getList();
	}

	// GET - Returns one client by ID
	static async getOne(req) {
		const { clientId } = req.params;

		return ClientModel.getOne(clientId);
	}

	// POST - Create a client
	static async createOne(req) {
		await validator.validate('ClientModel', req.body);

		return ClientModel.createOne(req.body);
	}

	// DELETE - Delete a client
	static async deleteOne(req) {
		const { clientId } = req.params;
		let checkClientExists = await ClientModel.getOne(clientId);

		if (checkClientExists == undefined)
			throw new NotFoundError("Error occured while retrieving details of" +
															" client Id: " + clientId);

		let deleteByIdResult = await ClientModel.deleteById(clientId);

		if (deleteByIdResult)
			throw new Error("Error occured while deleting the client Id: " +
											clientId);

		return { message: "Client Id: " + clientId + "deleted successfully" };
	}

	// PUT - Update a client
	static async updateOne(req) {
		const clientData = req.body;
		const { clientId } = req.params;

		await validator.validate('UpdateClientModel', clientData);
		// Add clientId to clientData object
		clientData.clientId = clientId;

		await ClientModel.updateById(clientData);

		return { message: 'success' };
	}

}


module.exports = ClientsController;
