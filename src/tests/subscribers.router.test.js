const chai = require('chai');
const chaiHttp = require('chai-http');
const { app1 } = require('../subscriber.server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Subscribers', () => {

    beforeAll(() => {
        jest.spyOn(global.console, 'log').mockReturnValue("");
    });

    describe('/', () => {
        it('Should send a 200 status if everything checks out', (done) => {
            chai.request(app1)
                .post('/test1')
                .send({ message: 'hello' })
                .end((error, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.keys('status', 'data');
                    expect(res.body.data).to.have.keys('message');
                    expect(res.body.status).to.deep.equal('success');
                    expect(res.body.data.message).to.deep.equal('hello');
                    done();
                });
        });
    });
});