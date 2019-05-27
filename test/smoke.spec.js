import sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinonMongoose from 'sinon-mongoose'

import server from '../src/app'

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /', () => {
  it('should respond with pong', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.be.equal('pong')
        done()
      })
  })
})

// TODO: do crud test for UserSchema
var User = require('../src/model/UserSchema')

describe('GET /users', function() {
  it('should return all users', function(done) {
    var UserMock = sinon.mock(User)
    var expectedResult = { firstName: 'asd' }
    UserMock.expects('find').yields(null, expectedResult)
    User.find(function(err, result) {
      UserMock.verify()
      UserMock.restore()
      expect(result.firstName).to.equal('asd')
      done()
    })
  })
})
