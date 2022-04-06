// @ts-ignore
import client from "../database";

export type Book = {
    title: string,
    author: string,
    total_pages: number,
    type: string,
    summary: string
}

export class BooksStore {
    // read the database
    async index(): Promise<Book[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM books";
            const res = await connection.query(sql);
            connection.release();
            return res.rows;
        } catch (error) {
            throw new Error(`Cannot get books ${error}`);
        }
    }

    // create a new book in the database
    async create(book: Book): Promise<Book> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = "INSERT INTO books (title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *";
            const values = [book.title, book.author, book.total_pages, book.type, book.summary];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new book ${book.title}. Error: ${error}`);
        }
    }

    // get an item from the database by id
    async show(id: string): Promise<Book> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM books WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find book ${id}. Error: ${error}`);        }
        }

     // update an item in the database by id
     async update(id: string, book: Book): Promise<Book> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'UPDATE books SET title = $1, author = $2 WHERE id=($3) RETURNING *';
            const values = [book.title, book.author];
            const result = await connection.query(sql, values, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update book ${id}. Error: ${error}`);        }
        }    

        // delete from the database
        async delete(id: string): Promise<Book> {
            try {
                // @ts-ignore
                const connection = await client.connect();
                const sql = 'DELETE FROM books WHERE id=($1) RETURNING *';
                const result = await connection.query(sql, [id]);
                const books = result.rows[0];
                connection.release();
                return books;
            } catch (err) {
                throw new Error(`Could not delete book ${id}. Error: ${err}`)
            }
        }
      

    
}