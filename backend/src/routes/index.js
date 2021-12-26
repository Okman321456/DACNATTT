const express = require('express');
const tourRoute = require('./tour.route');
const userRoute = require('./user.route')

const router = express.Router();

const defaultRoutes = [{
    path: '/tours',
    route: tourRoute,
}, {
    path: '/users',
    route: userRoute,
}];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/* istanbul ignore next */

module.exports = router;