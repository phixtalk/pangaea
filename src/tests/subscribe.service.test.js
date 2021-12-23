const faker = require("faker");
const serviceRepo = require("../db/data-access/subscription");
const SubscribeService = require("../db/services/subscribe.service");

describe('SubscribeService', () => {
  const data = {
    url: faker.url,
    topic: faker.topic,
  };

  it('should return response object from service repo', async () => {
      const spy = jest.spyOn(serviceRepo, 'createSubscription').mockResolvedValue(data);
      const Service = new SubscribeService();
      
      const res = await Service.createSubscription(data);
      expect(res.url).toEqual(data.id);
      expect(res.topic).toEqual(data.topic);

      spy.mockRestore();
  });
});