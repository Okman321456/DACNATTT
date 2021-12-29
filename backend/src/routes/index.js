const express = require('express');
const tourRoute = require('./tour.route')
const userRoute = require('./user.route')
const ticketRoute = require('./ticket.route')

const router = express.Router();

const defaultRoutes = [{
    path: '/tours',
    route: tourRoute,
}, {
    path: '/users',
    route: userRoute,
}, {
    path:'/tickets',
    route: ticketRoute
}];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/* istanbul ignore next */

module.exports = router;