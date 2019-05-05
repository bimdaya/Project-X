const chai = require('chai');
const td = require('testdouble');

const { expect } = chai;

const clientId = 'test-client-di';

// TODO: Test cases should be implemented for failing scenarios
describe('clientsController', () => {
	afterEach = () =>  {
		td.reset()
	}

	it('getAllClients should return a list of clients', async () => {
		const clientsList = [
			{ id: clientId }
		]

		const clientModel = td.replace('../../../src/models/ClientModel');
		td.when(clientModel.getClientsList()).thenResolve(clientsList);

		const ClientsController =
			require('../../../src/controllers/ClientsController');
		const getAllClientsResult = await ClientsController.getAllClients();

		expect(getAllClientsResult)
			.to.be.an('array')
			.that.equals(clientsList)
	});

	it ('getClientById should return one client', async () => {
		const clientModel = td.replace('../../../src/models/ClientModel');
		td.when(clientModel.getClientById(clientId)).thenResolve({ id: clientId });

		const ClientsController =
			require('../../../src/controllers/ClientsController');
		const getClientByIdResult =
			await ClientsController.getClientById({ params: { clientId: clientId }});

		expect(getClientByIdResult)
			.to.be.an('object')
			.and.has.property('id')
			.that.equals(clientId)
	});

	it ('createClient should create one client', async () => {
		const req = {
			body: {
				phoneNumber: '+4407777712333',
				firstName: 'John',
				surname: 'Doe',
			}
		}

		const validator = td.replace('../../../src/helpers/validator');
		td.when(validator.validate(td.matchers.isA(String), req.body))
			.thenReturn({ valid: true });

		const clientModel = td.replace('../../../src/models/ClientModel');
		td.when(clientModel.createClient(req.body))
			.thenResolve({ id: clientId });

		const ClientsController =
			require('../../../src/controllers/ClientsController');
		const createOneResult = await ClientsController.createClient(req);

		expect(createOneResult)
			.to.be.an('object')
			.and.has.property('id')
			.that.is.an('string')
	});

	it ('deleteClientById should delete client', async () => {
		const clientModel = td.replace('../../../src/models/ClientModel');
		td.when(clientModel.getClientById(clientId)).thenResolve({ id: clientId });

		const ClientsController =
			require('../../../src/controllers/ClientsController');
		const deleteOneResult = await ClientsController
			.deleteClientById({ params: { clientId: clientId }});

		expect(deleteOneResult)
			.to.be.an('object')
			.and.has.property('message')
			.that.is.an('string')
			.that.equals(`Client Id: ${clientId} deleted successfully.`)
	});

	it ('updateOne should update client', async () => {
		const clientModel = td.replace('../../../src/models/ClientModel');
		td.when(clientModel.getClientById(clientId))
			.thenResolve({ id: clientId });

		const req = {
			body: {
				firstname: 'John',
				surname: 'Doe',
			},
			params: {
				clientId: clientId
			}
		}

		const validator = td.replace('../../../src/helpers/validator');
		td.when(validator.validate(td.matchers.isA(String), req.body))
			.thenReturn({ valid: true });

		const ClientsController =
			require('../../../src/controllers/ClientsController');
		const updateOneResult = await ClientsController.updateClient(req);

		expect(updateOneResult)
			.to.be.an('object')
			.and.has.property('message')
			.that.is.an('string')
			.that.equals(`Client Id: ${clientId} updated successfully.`)
	});

});
