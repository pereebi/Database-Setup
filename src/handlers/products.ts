// import necessary dependecies
import express, { NextFunction, Request, Response } from 'express';
import { Product, AllProducts } from '../models/products';
import jwt from "jsonwebtoken";
import { verifyAuthToken } from './users';
const products = new AllProducts;

// method to show all Orders in the db
const index = async (req: Request, res: Response) => {
    const currentProducts = await products.index();
    res.json(currentProducts);
}

// method to show a order by id
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const singleProduct = await products.show(id);
        res.json(singleProduct);
    } catch (error) {
        res.status(400).json(error);

    }
}

// method to create a new order in the db
const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    };

    try {
        const newProduct = await products.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400).json(error);
    }
}

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
} 

export default products_routes;