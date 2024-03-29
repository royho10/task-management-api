const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	// form validation
	if ( !email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data =>{
		// comparring between the password that was written to the hash
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			// getting user's information
			console.log("hii");
			return db.select('first_name', 'last_name', 'first_name', 'email').from('users').where('email', '=', email)
			.then(user => {
				// getting user's lists
				db.select('list_id', 'list_count', 'title').from('lists').where('email', email).orderBy('list_id')
				.then(lists => {
					// getting user's tasks
					db.select('task_id', 'list_id', 'title').from('tasks').where('email', email).orderBy('task_id')
					.then(tasks => {
						userInfo = Object.assign(user[0], {lists: lists} , {tasks: tasks});
						res.json(userInfo);
					})
				})
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}