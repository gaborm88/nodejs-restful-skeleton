import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

import DBManager from './helper/DbHelper';
// todo database environment

require('sinon-mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

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

// TODO: do crud test for this
var User = require('../src/dal/model/UserSchema');

describe("GET /users", function(){
  it("should return all users", function(done){
    var UserMock = sinon.mock(User);
    var expectedResult = {firstName: 'asd'};
    UserMock.expects('find').yields(null, expectedResult);
    User.find(function (err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(result.firstName).to.equal('asd');
      done();
    });
  });
});
