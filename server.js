const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const add_list = require('./controllers/add_list');
const change_list = require('./controllers/change_list_name');
const delete_list = require('./controllers/delete_list');
const add_task = require('./controllers/add_task');
const change_task = require('./controllers/change_task_name');
const delete_task = require('./controllers/delete_task');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
// connecting the database to the server

// if on heroku

const db = knex({
	client: 'pg',	
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
}); 

// if on local	

/*	
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '',
		database: 'taskmanagement'
	}	
});
*/
	

console.log('db',db);
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
app.post('/lists', (req, res) => add_list.handleAddingList(req, res, db))

// handelling changing list name
app.put('/lists', (req, res) => change_list.handleChangingListName(req, res, db))

// DELETE -> delete a list
app.delete('/lists', (req, res) => delete_list.handleDeletingListName(req, res, db))

// handelling adding new task
app.post('/tasks', (req, res) => add_task.handleAddingTask(req, res, db))

// handelling changing task name
app.put('/tasks', (req, res) => change_task.handleChangingTaskName(req, res, db))

// DELETE -> delete a list
app.delete('/tasks', (req, res) => delete_task.handleDeletingTaskName(req, res, db))


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port 3000 ${process.env.PORT}`);
})
