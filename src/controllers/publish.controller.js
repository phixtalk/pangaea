const PublishService = require("../db/services/publish.service");
const Response = require('../utils/response.utils');

module.exports.publisher = async ({ body, params: { topic } }, res) => {
    try {
        if(Object.keys(body).length){
            const publisher = new PublishService();
            await publisher.sendNotification(topic, body);  
            Response.Success(res, "Notification sent successfully"); 
        }else{
            //i have completed the assignment and want to submit
            Response.BadRequestError(res, "Please provide body content.")
        }
    } catch (error) {
        Response.InternalServerError(res, error.message);
    }    
};