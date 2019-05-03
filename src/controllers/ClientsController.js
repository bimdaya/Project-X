const ClientModel = require('../models/ClientModel');
const validator = require('../helpers/validator');
const { NotFoundError } = require('../errors');

class ClientsController {
	// GET - Returns a list of clients
	static async getAllClients() {
		return ClientModel.getClientsList();
	}

	// GET - Returns one client by ID
	static async getClientById(req) {
		const { clientId } = req.params;
		let getClientByIdResult = await ClientModel.getClientById(clientId);

		if (getClientByIdResult == undefined)
			throw new NotFoundError("Error occured while retrieving details of" +
															" client Id: " + clientId);
		return getClientByIdResult;
	}

	// POST - Create a client
	static async createClient(req) {
		let clientData = req.body;
		await validator.validate('ClientModel', clientData);
		let createClientResult = await ClientModel.createClient(clientData);

		if (createClientResult == undefined)
			throw new RequestError("Error occured while creating  client with" +
										" first name: " + clientData.firstname +
										" surname: " + clientData.surname +
										" phone number: " + clientData.phonenumber);
		return { id : createClientResult };
	}

	// DELETE - Delete a client
	static async deleteClientById(req) {
		let clientData = await ClientsController.getClientById(req);

		if (clientData == undefined) return;

		const clientId = clientData.id;

		if (clientId == undefined)
			throw new NotFoundError("Error occured while retrieving details of" +
															" client Id: " + clientId);

		let deleteByIdResult = await ClientModel.deleteById(clientId);

		if (deleteByIdResult)
			throw new RequestError("Error occured while deleting the client Id: " +
											clientId);
		return { message: 'Client Id: ' + clientId + ' deleted successfully.' };
	}

	// PUT - Update a client
	static async updateClient(req) {
		await validator.validate('UpdateClientModel', req.body);
		let clientData = await ClientsController.getClientById(req);

		if (clientData == undefined) return;

		let clientId = clientData.id;
		let updateByIdResult = await ClientModel.updateById(clientData);

		if (updateByIdResult)
			throw new RequestError("Error occured while updating the client Id: " +
											clientId);
		return { message: 'Client Id: ' + clientId + ' updated successfully.' };
	}

}


module.exports = ClientsController;
