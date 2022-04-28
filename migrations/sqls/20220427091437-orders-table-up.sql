CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(70),
    users_id bigint REFERENCES users(id)
);