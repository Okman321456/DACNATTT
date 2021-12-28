const express = require('express');
const tourRoute = require('./tour.route');
const userRoute = require('./user.route')
const authRoute = require('./auth.route')

const router = express.Router();

const defaultRoutes = [{
        path: '/',
        route: tourRoute,
    }, {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/admin',
        route: userRoute,
    }
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/* istanbul ignore next */

module.exports = router;