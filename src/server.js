import api from './api/api';

module.exports.listen = port => api.listen(port, () => console.log(`Express server listening on port ${port}`));
