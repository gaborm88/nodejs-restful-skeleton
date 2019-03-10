import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

import DBManager from './helper/DbHelper';
// todo database environment

require('sinon-mongoose');

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

// todo do crud test for this
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

describe("Successful login", function(){
  it("should auth successfully", function(done){
    chai.request(server)
      .get('/login')
      .set('Content-Type', 'application/json')
      .send({username: "admin", password: "password"})
      .end((err, res) => {
        console.log('res.body.token', res.body.token)
        expect(res.body.success).to.true;
        done();
      });
  });
});

describe("Get users", function(){
  const dbman = new DBManager();
  before(async () => { await dbman.start(); });
  afterEach(async () => { await dbman.cleanup(); });
  after(async () => { await dbman.stop(); });

  it("should return all users", function(done){
    chai.request(server)
      .get('/users')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTUyMTY5ODQ3LCJleHAiOjE1NTIyNTYyNDd9.RW3XLz4oOUZvociny_1aQw8-pVSl2cR7y1HNEMqj7XY')
      .end((err, res) => {
        done();
      });
  });
});
