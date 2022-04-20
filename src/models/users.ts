import bcrypt from 'bcrypt';
import { isParameterPropertyDeclaration } from 'typescript';
// @ts-ignore 
import client from '../database';

export type User = {
    username: string,
    password: string
}

const pepper = process.env.BCRYPT_PASSWORD;


export class UserStore{ 

     // read the database
     async index(): Promise<User[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM users";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    } 

     // get a item from the database
    async show(id: string): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find users ${id}, Error: ${error}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const saltRounds = process.env.SALT_ROUNDS as string;
            const sql = "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
            const values = [user.username, hash];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new user ${user.username}. Error: ${error}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
    
        // @ts-ignore
        const connection = await client.connect();
        const sql = "SELECT password_digest FROM users WHERE username = ($1)";
        const result = await connection.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }

    // update an item in the database by id
    async update(id: string, username: string, password: string): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'UPDATE products SET username = $1, password_digest = $2 WHERE id=($3) RETURNING *';
            const values = [username, password, id];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update user ${id}. Error: ${error}`);        
        }
    }   

    // delete from the database
    async delete(id: string): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            const books = result.rows[0];
            connection.release();
            return books;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }    
}