const subscribeSchema = require("../models/subscribe.model");
const MongoDb = require("../index");
const SubscribeRepo = require('./subscription.js');

module.exports.connect = async () => {
  const conn = await MongoDb.connectToDB();
  return conn.model('Subscriber', subscribeSchema);
}

module.exports.createSubscription = async (filter, update) => {
  const Subscriber = await SubscribeRepo.connect();

  return await Subscriber.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true, rawResult: true }
    );
  };