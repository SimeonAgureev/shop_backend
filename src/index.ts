require('dotenv').config();
import app from './app/app';
import databaseConnection from './database/database.connection';

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT: number = Number(process.env.PORT) || 5000;

databaseConnection
  .then(() => app.listen(PORT))
  .catch((err) => console.log('[index]', err))
export default {}