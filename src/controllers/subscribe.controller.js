const SubscribeService = require("../db/services/subscribe.service");
const Response = require('../utils/response.utils');

module.exports.createSubscription = async ({ body: {url}, params: { topic } }, res) => {
    try {
        if(url && topic){
            const subscribeService = new SubscribeService();
            const data = {url, topic};
            await subscribeService.createSubscription(data, data);
            res.status(201).json(data);
            //Response.Success(res, data, 201); 
        }else{
            Response.BadRequestError(res, "Please provide url and topic parameters")
        }
    } catch (error) {
        Response.InternalServerError(res, error.message);
    }    
};