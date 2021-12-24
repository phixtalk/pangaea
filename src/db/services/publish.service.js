const axios = require("axios");
const database = require("../../db");

module.exports = class Publisher {
    constructor() {}

    getSubscribersByTopic(topic) {
        const subscribers = database.subscribers();
        if(subscribers.length == 0){
            return undefined;
        }
        return subscribers.filter(sub => sub.topic == topic);
    }

    async sendNotification(topic, body){
        const subscribers = this.getSubscribersByTopic(topic);
        if(subscribers){
            const firstKey = Object.keys(body)[0];
            const data = {};
            data[firstKey] = body[firstKey];
            const payload = { topic, data };
            await this.send(subscribers, payload);
        }
    }

    async send(subscribers, payload){
        return await Promise.all(subscribers.map((sub) => axios.post(sub.url, payload)));
    }
};