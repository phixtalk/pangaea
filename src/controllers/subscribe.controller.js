const SubscribeService = require("../db/services/subscribe.service");
const Response = require('../utils/response.utils');

module.exports.createSubscription = async ({ body: {url}, params: { topic } }, res) => {
    try {
        if(url){
            const subscribeService = new SubscribeService();
            const data = {url, topic};
            await subscribeService.createSubscription(data);
            res.status(201).json(data);
        }else{
            Response.BadRequestError(res, "Please provide url parameter")
        }
    } catch (error) {
        Response.InternalServerError(res, error.message);
    }    
};