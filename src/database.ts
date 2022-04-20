import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { 
    POSTGRES_HOST, 
    POSTGRES_DB, 
    POSTGRES_TEST_DB,
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    NODE_ENV
} = process.env;

let client;
console.log('ENV', NODE_ENV);
if (NODE_ENV === 'test' ) {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
} 

if (NODE_ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

  export default client;