const chai = require('chai');

const chaiHttp = require('chai-http');
const rp = require('request-promise-native');
const config = require('../helpers/config');

const { assert, expect } = chai;

chai.use(chaiHttp);

const api = chai.request(config.apiPath);
let clientData = '';

describe('Should handle client record requests ', function() {

  it('Should get all the client records', (done) => {
    api
      .get('/clients')
      .end((err, res) => {
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Should create a new client record", (done) => {
    const client =  {
      "firstName": "john",
      "surname": "doe",
      "phoneNumber": "+44076546046534"
    }
    api
      .post('/clients')
      .send(client)
      .end((err, res) => {
        clientData = res.body;
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);
        assert.property(res.body, 'id');
      done();
    });
  });

  it("Should fail creating a new client record", (done) => {
    const client =  {
      "firstName": "john",
      "surname": "doe"
    }
    api
      .post('/clients')
      .send(client)
      .end((err, res) => {
        expect(res).to.have.status(400);
      done();
    });
  });

  it("Should get the client record for the given client id", (done) => {
    api
      .get(`/clients/${clientData.id}`)
      .end((err, res) => {
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);
      done();
    });
  });

  it("Should update the client record for the given client id", (done) => {
    const client =  {
      "firstName": "john",
      "surname": "doe"
    }
    api
      .put(`/clients/${clientData.id}`)
      .send(client)
      .end((err, res) => {
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);
      done();
    });
  });

  it("Should delete the client record for the given client id", (done) => {
    api
      .delete(`/clients/${clientData.id}`)
      .end((err, res) => {
        expect(res).to.be.a('object');
        expect(res).to.have.status(200);
      done();
    });
  });

  it("Should fail delete the client record for the given client id", (done) => {
    api
      .delete(`/clients/12345678`)
      .end((err, res) => {
        expect(res).to.be.a('object');
        expect(res).to.have.status(404);
      done();
    });
  });
});
