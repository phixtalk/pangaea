const serviceRepo = require('../data-access/subscription');

module.exports = class SubscribeService {
  constructor() {}

  async createSubscription(payload) {
    return await serviceRepo.createSubscription(payload);
  }
};