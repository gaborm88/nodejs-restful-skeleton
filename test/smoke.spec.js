import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

// todo database

chai.use(chaiHttp);
const expect = chai.expect;

describe("smoke test", function() {
  it("checks equality", function() {
    expect(true).to.be.true;
  });
});

describe('GET /', () => {
  it('should respond with pong', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      expect(res.text).to.be.equal('pong');
      done();
    });
  });
});
