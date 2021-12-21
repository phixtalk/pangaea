const SubscribeService = require("../db/services/subscribe.service");
const Response = require('../utils/response.utils');

module.exports.createSubscription = async ({ body: {url}, params: { topic } }, res) => {
    try {
        if(url && topic){
            const successResponse = {url, topic}

            const subscribeService = new SubscribeService();
            const query = successResponse;
            const response = await subscribeService.createSubscription(query, query);
            
            let resCode = 201;
            if (response.lastErrorObject.updatedExisting) {
                resCode = 204;
            } 
            Response.Success(res, successResponse, resCode); 
        }else{
            Response.BadRequestError(res, "Please provide url and topic parameters")
        }
    } catch (error) {
        Response.InternalServerError(res, error.message);
    }    
};