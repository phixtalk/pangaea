const PublishService = require("../db/services/publish.service");
const Response = require('../utils/response.utils');

module.exports.publisher = async ({ body, params: { topic } }, res) => {
    try {
        if(body){
            const publisher = new PublishService();
            await publisher.sendNotification(topic, body);  
            Response.Success(res, "Notification sent successfully"); 
        }else{
            Response.BadRequestError(res, "Please provide message parameter.")
        }
    } catch (error) {
        Response.InternalServerError(res, error.message);
    }    
};