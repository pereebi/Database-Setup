 import { Book, BooksStore } from "../books";

 const store = new BooksStore();

 const book: Book = {
    title: 'The Smart Money Tribe',
    author: 'Arese',
    total_pages: 356,
    type: 'Financial',
    summary: 'An African Woman Guide To Making Bank' 
};

describe('Books Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index should return a list of products', async() => {
        const result = await store.index();
        expect(result).toBeDefined();
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('index should create a new product', async() => {
        const result = await store.create(book);
        expect(result).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    
    it('index should return a product by author', async() => {
        const result = await store.show(book.author);
        expect(result).toBeDefined({ id: 23, title: 'The Smart Money Tribe', author: 'Arese', total_pages: 356, type: 'Financial', summary: 'An African Woman Guide To Making Bank' });
    })

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    
    it('index should delete a product by author', async() => {
        const result = await store.delete(book.author);
        expect(result).toBeUndefined();
    })
})