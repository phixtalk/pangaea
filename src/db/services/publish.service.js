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
            for (let i = 0; i < subscribers.length; i++) {
                const item = subscribers[i];
                await this.send(item.url, topic, body);
            }
        }
    }

    async send(url, topic, body){
        const firstKey = Object.keys(body)[0];
        const data = {};
        data[firstKey] = body[firstKey];
        const payload = { topic, data };
        return await axios.post(url, payload);
    }
};