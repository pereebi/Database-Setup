import express, { Request, Response } from 'express';
import { Book, BooksStore } from '../books';

const bookHandler = new BooksStore();

const index = async (req: Request, res: Response) => {
    const myBooks = await bookHandler.index();
    res.json(myBooks);
}

const create = async (eq: Request, res: Response ) => {
    try {
        const book: Book = {
            title: 'Side Hustle',
            author: 'Guillebeau',
            total_pages: 258,
            type: 'Financial',
            summary: 'Build a side business and make extra money without quitting your day job.' 
        }
        const myBooks = await bookHandler.create(book);
        res.json(myBooks);
    } catch (error) {
        res.status(400).json(error);
    }
   
}

const show = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const myBooks = await bookHandler.show(id);
    res.json(myBooks);
    console.log(myBooks);
}


const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const myBooks = await bookHandler.delete(id);
    res.json(myBooks);
    console.log(myBooks);
}

const books_routes = (app: express.Application) => {
    app.get('/books', index);
    app.post('/books', create);
    app.get('/books/:id', show);
    app.delete('/books/:id', deleteBook);
    
}

export default books_routes;