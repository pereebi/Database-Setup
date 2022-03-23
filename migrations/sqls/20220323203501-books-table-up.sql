CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    author VARCHAR(50),
    total_pages integer,
    type VARCHAR(50),
    summary VARCHAR(100)
);

INSERT INTO books (
    title,
    author,
    total_pages,
    type,
    summary
) VALUES (
    'The Smart Money Tribe',
    'Arese Ugwu',
    356,
    'Financial',
    'An African Woman Guide To Making Bank' 
)