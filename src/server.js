import config from './config';
import api from './api/api';

api.listen(config.port, () => console.log(`Express server listening on port ${config.port}`));
