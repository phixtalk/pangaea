const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../publisher.server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Subscribe', () => {

    beforeAll(() => {
        jest.spyOn(global.console, 'log').mockReturnValue("");
    });

    describe('/subscribe/:topic', () => {
        it('Should send a 400 error if url paramenter was not sent along with request', (done) => {
            chai.request(app)
                .post('/subscribe/topic1')
                .end((error, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.status).to.deep.equal('error');
                    expect(res.body.error).to.deep.equal('Please provide url parameter');
                    done();
                });
        });

        it('Should send a 201 status if everything checks out', (done) => {
            const url = 'http://localhost:9000/test1';
            chai.request(app)
                .post('/subscribe/topic1')
                .send({ url })
                .end((error, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.keys('url', 'topic');
                    expect(res.body.url).to.deep.equal(url);
                    expect(res.body.topic).to.deep.equal('topic1');
                    done();
                });
        });

        
    });
});