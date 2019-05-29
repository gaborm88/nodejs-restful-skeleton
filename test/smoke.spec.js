import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonMongoose from 'sinon-mongoose';

import server from '../src/server';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /', () => {
  it('should respond with pong', (done) => {
    chai
      .request(server.listen())
      .get('/')
      .end((err, res) => {
        expect(res.text).to.be.equal('pong');
        done();
      });
  });
});

const User = require('../src/models/UserSchema');

describe('user CRUD test', () => {
  it('find user', (done) => {
    const UserMock = sinon.mock(User);
    const expectedResult = { firstName: 'asd' };
    UserMock.expects('find').yields(null, expectedResult);
    User.find((err, result) => {
      UserMock.verify();
      UserMock.restore();
      expect(result.firstName).to.equal('asd');
      done();
    });
  });
});
