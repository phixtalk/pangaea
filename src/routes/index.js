const subscribeRoute = require('./subscribe.router');
const publishRoute = require('./publish.router');

const router = {
    subscribeRoute,
    publishRoute,
};

module.exports = router;