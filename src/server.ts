import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url);
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Assignment-2 is listening on port ${config.port}`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

main();
