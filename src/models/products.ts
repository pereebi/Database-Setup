// import the client connection from the database file
// @ts-ignore
import client from "../database";

// create and export a type for the Orders
export type Product = {
    name: string,
    price: number
}

// create and export a class for the CRUD methods
export class AllProducts {

    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM products";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    } 

     // create new product
     async create(product: Product): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const text = "INSERT INTO products(name, price) VALUES($1, $2) RETURNING *";
            const values = [product.name, product.price];
            const res = await connection.query(text, values);
            console.log(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not create new product ${error}`)
        }
    }

    // get a item from the database
    async show(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find product ${id}, Error: ${error}`);
        }
    }
    
}
