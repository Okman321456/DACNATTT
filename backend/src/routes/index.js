const express = require('express');

const tourRoute = require('./tour.route')
const userRoute = require('./user.route')
const newsRoute = require('./news.route')
const ticketRoute = require('./ticket.route')
const authRoute = require('./auth.route')
const feedbackRoute = require('./feedback.route')

const router = express.Router();

const defaultRoutes = [{
    path: '/news',
    route: newsRoute,
}, {
    path: '/users',
    route: userRoute,
}, {
    path: '/tickets',
    route: ticketRoute
}, {
    path: '/auth',
    route: authRoute,
}, {
    path: '/admin',
    route: userRoute,
}, {
    path: '/',
    route: tourRoute,
}, {
    path: '/feedbacks',
    route: feedbackRoute,
}];



defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/* istanbul ignore next */

module.exports = router;