import config from './config';
import api from './api/api';
import db from './db';

db.connect();

api.listen(config.port, () => console.log(`Express server listening on port ${config.port}`));
