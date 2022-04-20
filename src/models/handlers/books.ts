import express, { Request, Response } from 'express';
import { Book, BooksStore } from '../books';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from './users';


const bookHandler = new BooksStore();

const index = async (req: Request, res: Response) => {
    try {
        const myBooks = await bookHandler.index();
        res.json(myBooks);
    } catch (error) {
        res.status(400).json(error);

    }
   
}

const create = async (req: Request, res: Response ) => {
    const book: Book = {
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        type: req.body.type,
        summary: req.body.summary 
    };

    try {
        const myBooks = await bookHandler.create(book);
        res.json(myBooks);
    } catch (error) {
        res.status(400).json(error);
    }
   
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myBooks = await bookHandler.show(id);
        res.json(myBooks);
    } catch (error) {
        res.status(400).json(error);

    }
  
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { title, author, total_pages } = req.body;
        const myBooks = await bookHandler.update(id, title, author, total_pages);
        res.json(myBooks);
        console.log(myBooks);
    } catch (error) {
        res.status(400).json(error);

    }
    
}

const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myBooks = await bookHandler.delete(id);
        res.json(myBooks);
    } catch (error) {
        res.status(400).json(error);

    }
   
}

const books_routes = (app: express.Application) => {
    app.get('/books', index);
    app.post('/books', verifyAuthToken, create);
    app.get('/books/:id', show);
    app.put('/books/:id', verifyAuthToken, update);
    app.delete('/books/:id', deleteBook);
    
}

export default books_routes;