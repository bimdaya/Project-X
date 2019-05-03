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
		const getClientByIdResult = await ClientModel.getClientById(clientId);

		if (getClientByIdResult.id === undefined) {
			throw new NotFoundError(`Error occured while retrieving details of
															client Id: ${clientId} \n
															${getClientByIdResult.errMessage}`);
		}
		return getClientByIdResult;
	}

	// POST - Create a client
	static async createClient(req) {
		const clientData = req.body;
		await validator.validate('ClientModel', clientData);
		const createClientResult = await ClientModel.createClient(clientData);

		if (createClientResult.idfirstname === undefined) {
			throw new Error(`Error occured while creating client with
											first name: ${clientData.firstName}
											surname: ${clientData.surname}
											phone number: ${clientData.phoneNumber}\n
											${createClientResult.errMessage}`);
		}
		return createClientResult;
	}

	// DELETE - Delete a client
	static async deleteClientById(req) {
		const clientData = await ClientsController.getClientById(req);
		const clientId = clientData.id;

		if (clientId === undefined) {
			throw new NotFoundError('Client Id not found.');
		}

		const deleteByIdResult = await ClientModel.deleteById(clientId);

		if (deleteByIdResult) {
			throw new Error(`Error occured while deleting the client Id:
											${clientId}\n ${deleteByIdResult.errMessage}`);
		}
		return { message: `Client Id: ${clientId} deleted successfully.` };
	}

	// PUT - Update a client
	static async updateClient(req) {
		await validator.validate('UpdateClientModel', req.body);
		const clientData = await ClientsController.getClientById(req);
		const clientId = clientData.id;

		if (clientId === undefined) {
			throw new NotFoundError('Client Id not found.');
		}
		const updateByIdResult = await ClientModel.updateById(clientData);

		if (updateByIdResult) {
			throw new Error(`Error occured while updating the
											client Id: ${clientId}\n ${updateByIdResult.errMessage}`);
		}
		return { message: `Client Id: ${clientId} updated successfully.` };
	}

}


module.exports = ClientsController;
