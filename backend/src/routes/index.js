const express = require('express');

const tourRoute = require('./tour.route')
const userRoute = require('./user.route')
const newsRoute = require('./news.route')
const ticketRoute = require('./ticket.route')
const authRoute = require('./auth.route')
const feedbackRoute = require('./feedback.route')
const statisticRoute = require('./statistic.route')
const storeRoute = require('./store.route')

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
    route: feedbackRoute,
}, {
    path: '/manage',
    route: newsRoute,
}, {
    path: '/cua-hang',
    route: storeRoute
}, {
    path: '/feedbacks',
    route: feedbackRoute,
}, {
    path: '/',
    route: tourRoute,
}, {
    path:'/statistic',
    route: statisticRoute
}];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/* istanbul ignore next */

module.exports = router;