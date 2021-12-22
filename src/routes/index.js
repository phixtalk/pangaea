const subscribeRoute = require('./subscribe.router');
const publishRoute = require('./publish.router');
const subscribers = require('./subscribers.router');

const router = {
    subscribeRoute,
    publishRoute,
    subscribers,
};

module.exports = router;