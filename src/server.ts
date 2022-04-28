import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import books_routes from './handlers/books';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';
import products_routes from './handlers/products';

const app: express.Application = express();
const address: string = "0.0.0.0:3001";

app.use(bodyParser.json());

books_routes(app);
users_routes(app);
orders_routes(app);
products_routes(app);

app.listen(3001, function() {
    console.log(`Starting app on: ${address}`);
})