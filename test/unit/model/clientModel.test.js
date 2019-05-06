const chai = require('chai');
const td = require('testdouble');

const { expect } = chai;

const clientId = 'test-client-id';

describe('clientModel', () => {
  const queries = td.replace('../../../src/models/sql/queries');
  const db = td.replace('../../../src/helpers/postgres');
  const clientModel = require('../../../src/models/ClientModel');

  afterEach = () => {
    td.reset()
  }

  it('getClientsList should return a list of clients', async () => {
    const clientsList = [{
      id: clientId
    }];

    td.when(db.any(queries.clients.get, {})).thenResolve(clientsList);
    const getAllClientsResult = await clientModel.getClientsList();

    expect(getAllClientsResult)
      .to.be.an('array')
      .that.equals(clientsList)
  });

  it('getClientById should return one client', async () => {
    const client = {
      id: clientId
    };

    td.when(db.one(queries.clients.getOne, { clientId })).thenResolve(client);
    const getClientByIdResult = await clientModel.getClientById(clientId);

    expect(getClientByIdResult)
      .to.be.an('object')
      .and.has.property('id')
      .that.equals(client.id)
  });

  it('createClient should create one client', async () => {
    const req = {
      body: {
        phoneNumber: '+4407777712333',
        firstName: 'John',
        surname: 'Doe',
      }
    };
    const client = {
      client: clientId
    };

    td.when(db.one(queries.clients.createOne, req.body)).thenResolve(client);
    const createOneResult = await clientModel.createClient(req.body);

    expect(createOneResult)
      .to.be.an('object')
      .and.has.property('id')
      .that.is.an('string')
  });

  it('deleteById should delete client', async () => {
    td.when(db.none(queries.clients.deleteOne, { clientId }))
      .thenResolve(undefined);
    const deleteOneResult = await clientModel.deleteById(clientId);

    expect(deleteOneResult)
      .to.be.undefined
  });

  it('updateById should update client in the database', async () => {
    const clientData = {
      firstname: 'John',
      surname: 'Doe',
      clientId: clientId
    }

    td.when(db.none(queries.clients.updateOne, clientData))
      .thenResolve(undefined);
    const updateOneResult = await clientModel.updateById(clientData);

    expect(updateOneResult)
      .to.be.undefined
  });

});
