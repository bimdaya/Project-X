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
		let getClientByIdResult = await ClientModel.getOne(clientId);

		if (getClientByIdResult == undefined)
			throw new NotFoundError("Error occured while retrieving details of" +
															" client Id: " + clientId);
		return getClientByIdResult;
	}

	// POST - Create a client
	static async createOne(req) {
		await validator.validate('ClientModel', req.body);

		return ClientModel.createOne(req.body);
	}

	// DELETE - Delete a client
	static async deleteOne(req) {
		let clientData = await ClientsController.getOne(req);

		if (clientData == undefined) return;

		const clientId = clientData.id;

		if (clientId == undefined)
			throw new NotFoundError("Error occured while retrieving details of" +
															" client Id: " + clientId);

		let deleteByIdResult = await ClientModel.deleteById(clientId);

		if (deleteByIdResult)
			throw new Error("Error occured while deleting the client Id: " +
											clientId);
		return { message: "Client Id: " + clientId + " deleted successfully." };
	}

	// PUT - Update a client
	static async updateOne(req) {
		await validator.validate('UpdateClientModel', req.body);
		let clientData = await ClientsController.getOne(req);

		if (clientData == undefined) return;

		let clientId = clientData.id;
		let updateByIdResult = await ClientModel.updateById(clientData);

		if (updateByIdResult)
			throw new Error("Error occured while updating the client Id: " +
											clientId);
		return { message: "Client Id: " + clientId + " updated successfully." };
	}

}


module.exports = ClientsController;
