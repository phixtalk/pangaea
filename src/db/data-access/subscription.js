const database = require("../index");
const subscribeRepo = require('./subscription.js');

module.exports.createSubscription = async (payload) => {
  const subscribers = database.subscribers();
  let count = subscribers.length;
  if(!subscribeRepo.checkDuplicate(payload, subscribers)){
    count = subscribers.push(payload);
  }
  console.log(subscribers);
  return Promise.resolve(count);
};

module.exports.checkDuplicate = (payload, subscribers) => {
  return subscribers.find(sub => sub.url ==payload.url && sub.topic == payload.topic);
}