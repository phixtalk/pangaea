const database = require('../db');
const subscribeRepo = require('../db/data-access/subscription');


describe('Subscription', () => {

    beforeAll(() => {
        jest.spyOn(global.console, 'log').mockReturnValue("");
    });

    const data = [
        { url: 'http://localhost:9000/test1', topic: 'topic1' },
        { url: 'http://localhost:9000/test2', topic: 'topic1' },
        { url: 'http://localhost:9001/test2', topic: 'topic2' },
    ];
    
    it('checkDuplicate: should return undefined if no duplicate exist', () => {
        const payload = {url: 'http://localhost:9001/test3', topic: 'topic2'};
        const res = subscribeRepo.checkDuplicate(payload, data);
        expect(res).toBe(undefined);
    });

    it('checkDuplicate: should return object that if found in data', () => {
        const payload = {url: 'http://localhost:9001/test2', topic: 'topic2'};
        expect(subscribeRepo.checkDuplicate(payload, data)).toEqual(payload);
    });

    it("createSubscription: should add a new subscriber if it doesn't exist", async () => {
        const spy = jest.spyOn(database, 'subscribers').mockReturnValue(data);
        const payload = {url: 'http://localhost:9001/test3', topic: 'topic2'};
        const count = data.length;
        const res = await subscribeRepo.createSubscription(payload)
        expect(res).toEqual(count + 1);
        spy.mockRestore();
    });

    it("createSubscription: should not add a new subscriber if it exist", async () => {
        const spy = jest.spyOn(database, 'subscribers').mockReturnValue(data);
        const payload = data[0];
        const count = data.length;
        const res = await subscribeRepo.createSubscription(payload)
        expect(res).toEqual(count);
        spy.mockRestore();
    });
  });