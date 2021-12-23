const axios = require("axios");
const database = require("../db");
const Publisher = require("../db/services/publish.service");

jest.mock("axios");

describe('Publisher', () => {
    const data = [
        { url: 'http://localhost:9000/test1', topic: 'topic1' },
        { url: 'http://localhost:9000/test2', topic: 'topic1' },
        { url: 'http://localhost:9001/test2', topic: 'topic2' },
    ];

    const data2 = [];
    const topic = 'topic1';
    const body = { message: 'Hello World' };

    const send = jest.fn().mockImplementation(() => {
        return "";
    });
    
    it('getSubscribersByTopic: should return undefined for empty subscriber', () => {
        const spy = jest.spyOn(database, 'subscribers').mockReturnValue(data2);
        const publisher = new Publisher();
        const res = publisher.getSubscribersByTopic(data);
        expect(res).toBe(undefined);
        spy.mockRestore();
    })

    it('getSubscribersByTopic: should return subscribers filtered by topic', () => {
        const filtered = data.filter(sub => sub.topic == topic)
        const spy = jest.spyOn(database, 'subscribers').mockReturnValue(data);
        const publisher = new Publisher();
        const res = publisher.getSubscribersByTopic(topic);
        expect(res).toEqual(filtered);
        spy.mockRestore();
    });

    it('sendNotification: should call send method if subscribers are available', () => {
        const spy = jest.spyOn(database, 'subscribers').mockReturnValue(data);
        const spy2 = jest.spyOn(Publisher.prototype, 'send').mockResolvedValue(send);

        const publisher = new Publisher();
        const res = publisher.sendNotification(topic, body);
        expect(publisher.send).toHaveBeenCalled();
        spy.mockRestore();
        spy2.mockRestore();
    });

    it('send: should return axios response', async () => {
        const response = { topic: 'topic1', data: { message: 'Hello' } };
    
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        const publisher = new Publisher();
        const res = await publisher.send("http://localhost:9000/test1", topic, body);
        expect(res).toEqual(response);
    });
});