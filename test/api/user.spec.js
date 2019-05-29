import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import DBManager from '../helper/DbHelper';
import UserSchema from '../../src/models/UserSchema';

chai.use(chaiHttp);
const { expect } = chai;

const createUser = async user => await UserSchema.create(user);

// TODO: after causing mongo error
describe('CRUD api users', () => {
  const dbman = new DBManager();
  let token = null;

  before(async () => {
    await dbman.start();

    const authResult = await chai
      .request(server.listen())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'admin', password: 'password' });
    token = authResult.body.token;
  });

  afterEach(async () => {
    await dbman.cleanup();
  });
  // after(async () => { await dbman.stop(); });

  it('should create user', (done) => {
    chai
      .request(server.listen())
      .post('/users')
      .set('authorization', `Bearer ${token}`)
      .send(validUserAttributes)
      .end((err, res) => {
        expect(res.body._id).to.be.not.null;
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return all users', async () => {
    await createUser(validUserAttributes);
    await createUser(validUserAttributes);

    const getUsersResp = await chai
      .request(server.listen())
      .get('/users')
      .set('authorization', `Bearer ${token}`);

    expect(getUsersResp.status).to.equal(200);
    expect(getUsersResp.body.length).to.equal(2);
  });

  it('should return with a users', async () => {
    const user = await createUser(validUserAttributes);

    const getUsersResp = await chai
      .request(server.listen())
      .get(`/users/${user._id}`)
      .set('authorization', `Bearer ${token}`);

    expect(getUsersResp.status).to.equal(200);
    expect(getUsersResp.body._id).to.equal(user._id.toString());
  });

  it('should update a user', async () => {
    const user = await createUser(validUserAttributes);

    const updateUserResp = await chai
      .request(server.listen())
      .put(`/users/${user._id}`)
      .set('authorization', `Bearer ${token}`)
      .send(validUserAttributes);

    expect(updateUserResp.status).to.equal(200);
  });

  it('should remove a user', async () => {
    const user = await createUser(validUserAttributes);

    const deleteUserResp = await chai
      .request(server.listen())
      .delete(`/users/${user._id}`)
      .set('authorization', `Bearer ${token}`);

    expect(deleteUserResp.status).to.equal(200);
  });
});

// TODO: after causing mongo error
describe('wrong users requests', () => {
  const dbman = new DBManager();
  let token = null;

  before(async () => {
    await dbman.start();

    const authResult = await chai
      .request(server.listen())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'admin', password: 'password' });
    token = authResult.body.token;
  });

  afterEach(async () => {
    await dbman.cleanup();
  });
  // after(async () => { await dbman.stop(); });
  /* // this test doesn't make sense until validations
  it("should create user", function (done) {
    chai.request(server)
      .post('/users')
      .set('authorization', `Bearer ${token}`)
      .send(validUserAttributes)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
  */

  it('should return with a users', (done) => {
    chai
      .request(server.listen())
      .get('/users/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('should response with error during update a user', (done) => {
    chai
      .request(server.listen())
      .put('/users/1')
      .set('authorization', `Bearer ${token}`)
      .send(validUserAttributes)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('should response with error during remove a user', (done) => {
    chai
      .request(server.listen())
      .delete('/users/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(500);
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
      zipCode: 'zipcode',
    },
  ],
};
