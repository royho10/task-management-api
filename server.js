const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const lists = require('./controllers/lists');

// connecting the database to the server
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '',
		database: 'taskmanagement'
	}
});

const app = express();

// to be able to read req.body in json
app.use(bodyParser.json());
// to prevent chrome error massage about our server
app.use(cors());

app.get('/', (req,res) => {
	res.send(db.users);
})

// handelling signin
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))

// handelling register
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, saltRounds))

// getting user's information for later development
app.get('/profile/:id', (req, res) => profile.handleGetProfile(req, res, db))

// handelling adding new list
app.post('/lists', (req, res) => lists.handleAddingList(req, res, db))

// PUT -> change list name
// DELETE -> delete a list

app.listen(3000, () => {
	console.log('app is running on port 3000');
})
