import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { BooksStore } from './models/books';
import { Book } from './models/books';

const app: express.Application = express();
const address: string = "0.0.0.0:3001";

app.use(bodyParser.json());

const books = new BooksStore();

app.get('/', async function (req: Request, res: Response) {
    // create new book
    const book: Book = {
        title: 'The Smart Money Tribe',
        author: 'Arese',
        total_pages: 356,
        type: 'Financial',
        summary: 'An African Woman Guide To Making Bank' 
    }

    const author = req.query.author as string;

    const books = new BooksStore();
    const result = await books.delete(author);
    res.send(result);
    console.log(result);
})

app.listen(3001, function() {
    console.log(`Starting app on: ${address}`);
})