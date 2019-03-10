import MongoMemoryServer from 'mongodb-memory-server';
import db from '../../src/db';

const COLLECTIONS = ['users'];

class DBManager {
  constructor() {
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    const url = await this.server.getConnectionString();
    this.connection = db.connect(url);
  }

  stop() {
    if (this.connection) this.connection.close();
    // it will be stopped automatically when you exit from script
    // return this.server.stop();
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c => this.connection.db.collection(c).deleteMany({})));
  }
}

module.exports = DBManager;
