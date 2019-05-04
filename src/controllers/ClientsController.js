const ClientModel = require('../models/ClientModel');
const validator = require('../helpers/validator');
const { NotFoundError } = require('../errors');

/**
* Handle API requests for client management
*/
class ClientsController {
	/**
	* GET - Get a list of clients
	* @return {array} Array of client objects
	*/
	static async getAllClients() {
		return ClientModel.getClientsList();
	}

	/**
	* GET - Get client details to a given client id
	* @param {object} req api request
	* @return {object} Client details
	*/
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

	/**
	* POST - Create a client by assigning given details
	* @param {object} req api request
	* @return {object} Success message
	* @throw Error
	*/
	static async createClient(req) {
		const clientData = req.body;
		await validator.validate('ClientModel', clientData);
		const createClientResult = await ClientModel.createClient(clientData);

		if (createClientResult.id === undefined) {
			throw new Error(`Error occured while creating client with
				first name: ${clientData.firstName}
				surname: ${clientData.surname}
				phone number: ${clientData.phoneNumber}\n
				${createClientResult.errMessage}`);
		}
		return createClientResult;
	}

	/**
	* DELETE - Delete a client of a given client id
	* @param {object} req api request
	* @return {object} Success message
	* @throw Error
	*/
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

	/**
	* PUT - Update a client for given details
	* @param {object} req api request
	* @return {object} Success message
	* @throw Error
	*/
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
