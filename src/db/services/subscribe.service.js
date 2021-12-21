const serviceRepo = require('../data-access/subscription');

module.exports = class SubscribeService {
  constructor() {}

  async createSubscription(query, payload) {
    return await serviceRepo.createSubscription(query, payload);
  }
};