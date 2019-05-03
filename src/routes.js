const { asyncRouteHandler } = require('./middleware/routeHandlers');
const ClientsController = require('./controllers/ClientsController');

const apiRoutes = (app) => {
	app.route('/api/v1/clients').get(asyncRouteHandler(ClientsController.getAllClients));
	app.route('/api/v1/clients').post(asyncRouteHandler(ClientsController.createClient));

	app.route('/api/v1/clients/:clientId').get(asyncRouteHandler(ClientsController.getClientById));
	app.route('/api/v1/clients/:clientId').delete(asyncRouteHandler(ClientsController.deleteClientById));
	app.route('/api/v1/clients/:clientId').put(asyncRouteHandler(ClientsController.updateClient));
};

module.exports = {
	apiRoutes,
};
