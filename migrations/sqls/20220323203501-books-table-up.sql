CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    author VARCHAR(50),
    total_pages integer,
    type VARCHAR(50),
    summary text
);
