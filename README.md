Requirements
--------------------
* Node.js v10 LTS
* Postgres 10

Quick Start
--------------------

```
$ yarn install
```
* Postgres username: postgres, password: postgres

Starting service
--------------------

* Run `yarn start` to start the service.
* Run `yarn watch` to start the service with watching enabled (PM2).

Testing the service
--------------------

* Run `yarn test` to test the service.
* To run integration test, run the service at port 80 and run `yarn test:integration`.

Acceptance Criteria
--------------------
1. REST API endpoint for creating a client object. [Done]
2. REST API endpoint for reading client object. [Done]
3. REST API endpoint for reading all clients. [Done]
4. REST API endpoint for updating client object. [Done]
5. REST API endpoint for deleting a client object. [Done]
