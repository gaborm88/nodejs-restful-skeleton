import '@babel/polyfill';

import config from './config';
import { listen } from './server';
import { connect } from './db';

listen(config.appPort);

connect(config.mongoConnectionUrl);
