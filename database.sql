/* Run this code in your SQL shell to create the tables */

CREATE TABLE users (
	user_id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email TEXT NOT NULL UNIQUE,
	joined TIMESTAMP NOT NULL 
);

CREATE TABLE login (
	login_id BIGSERIAL NOT NULL PRIMARY KEY,
	email TEXT REFERENCES users (email) NOT NULL UNIQUE,
	hash VARCHAR(100) NOT NULL
);

CREATE TABLE lists (
	list_id BIGSERIAL NOT NULL PRIMARY KEY,
	email TEXT REFERENCES users (email) NOT NULL,
	list_count BIGSERIAL NOT NULL,
	title VARCHAR(100) NOT NULL
);

CREATE TABLE tasks (
	task_id BIGSERIAL NOT NULL PRIMARY KEY,
	email TEXT REFERENCES users (email) NOT NULL,
	list_id BIGINT REFERENCES lists (list_id) NOT NULL,
	title VARCHAR(100) NOT NULL
);