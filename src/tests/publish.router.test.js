const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../publisher.server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Publisher', () => {

    beforeAll(() => {
        jest.spyOn(global.console, 'log').mockReturnValue("");
    });

    describe('/', () => {

        it('Should send a 400 error if request body was not sent along with request', (done) => {
            chai.request(app)
                .post('/publish/topic1')
                .end((error, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.keys('status', 'error');
                    expect(res.body.status).to.deep.equal('error');
                    expect(res.body.error).to.deep.equal('Please provide body content.');
                    done();
                });
        });

        it('Should send a 200 status if everything checks out', (done) => {
            chai.request(app)
                .post('/publish/topic1')
                .send({ message: 'hello' })
                .end((error, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.keys('status', 'data');
                    expect(res.body.status).to.deep.equal('success');
                    expect(res.body.data).to.deep.equal('Notification sent successfully');
                    done();
                });
        });
    });
});