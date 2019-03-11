import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import DBManager from '../helper/DbHelper';

chai.use(chaiHttp);
const expect = chai.expect;

// TODO: do not reuse the created user in the other tests. 
// TODO: after causing mongo error 
describe("CRUD api users", function () {
  const dbman = new DBManager();
  let token = null;
  
  before(async () => {
    await dbman.start();

    const authResult = await chai.request(server)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: "admin", password: "password" })
    token = authResult.body.token
  });

  //afterEach(async () => { await dbman.cleanup(); });
  //after(async () => { await dbman.stop(); });

  let userId = null;
  it("should create user", function (done) {
    chai.request(server)
      .post('/users')
      .set('authorization', `Bearer ${token}`)
      .send(validUserAttributes)
      .end((err, res) => {
        expect(res.body._id).to.be.not.null;
        expect(res.status).to.equal(200);
        userId = res.body._id;
        done();
      });
  });

  it("should return all users", function (done) {
    chai.request(server)
      .get('/users')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        expect(res.body[0]._id).to.equal(userId);
        done();
      });
  });

  it("should update a user", function (done) {
    chai.request(server)
      .put(`/users/${userId}`)
      .set('authorization', `Bearer ${token}`)
      .send(validUserAttributes)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal(userId);
        done();
      });
  });

  it("should remove a user", function (done) {
    chai.request(server)
    .delete(`/users/${userId}`)
    .set('authorization', `Bearer ${token}`)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
});

const validUserAttributes = {
  firstName: 'John',
  lastName: 'McClane',
  login: 'john.mcClane',
  addresses: [
    {
      street: 'street',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode'
    }
  ]
}
