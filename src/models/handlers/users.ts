import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../users';
import jwt from 'jsonwebtoken';


const users = new UserStore();

const index = async (req: Request, res: Response) => {
    const allUsers = await users.index();
    res.json(allUsers);
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const thisUser = await users.show(id);
        res.json(thisUser);
    } catch (error) {
        res.status(400).json(error);

    }
}

const create = async (req: Request, res: Response ) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const newUsers = await users.create(user);
        const token = jwt.sign({ user: newUsers }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (error) {
        res.status(400).json(error);
    }
   
};

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const authenticatedUser = await users.authenticate(req.body.username, req.body.password);
        const token = jwt.sign({ user: authenticatedUser }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (error) {
        res.status(401);
    res.json({ error });    
    }
}

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(401)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { username, password } = req.body;
        const updatedUser = await users.update(id, username, password);
        res.json(updatedUser);
        console.log(updatedUser);
    } catch (error) {
        res.status(400).json(error);

    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const deletedUser = await users.delete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json(error);

    }
}

const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.post('/login', authenticate);
    app.put('/users/:id', verifyAuthToken, update);
    app.delete('/users/:id', verifyAuthToken, deleteUser);
    
}

export default users_routes;