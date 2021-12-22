const subscribeSchema = require("../models/subscribe.model");
const database = require("../index");
const subscribeRepo = require('./subscription.js');
const Subscriber = require("../models/subscribe.model");

module.exports.connect = async () => {
  const conn = await database.connectToDB();
  return conn.model('Subscriber', subscribeSchema);
}

module.exports.createSubscription = async (filter, update) => {
  const subscribers = database.subscribers;
  if(!subscribeRepo.checkDuplicate(update, subscribers)){
    subscribers.push(update);
  }
  console.log(subscribers);
  return Promise.resolve(update);
};

module.exports.checkDuplicate = (payload, subscribers) => {
  return subscribers.find(sub => sub.url ==payload.url && sub.topic == payload.topic);
}

module.exports.createSubscriptionMongoose = async (filter, update) => {
  const Subscriber = await subscribeRepo.connect();

  return await Subscriber.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true, rawResult: true }
    );
};