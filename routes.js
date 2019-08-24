const routes=require('next-routes')();
//create new route mapping
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', 'campaigns/requests/index')
    .add('/campaigns/:address/requests/new','/campaign/requests/new');


module.exports = routes;