import config from './config';
import app from './app';

app.listen(config.port, () => console.log(`Express server listening on port ${config.port}`));
