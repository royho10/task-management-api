handleAddingTask = (req, res, db) => {
	const { email, list_id, title } = req.body;
	db.select('*').from('users').where('email', '=', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			db('tasks')			
			.insert({
				email: email,
				title: title,
				list_id: list_id
			})
			.returning('*')			
			.then(task => {
				db.select('*').from('tasks').where('email', email).orderBy('task_id') 			
				.then(tasks => {
						res.json(tasks)
				})	
			})				
			.catch(err => res.status(400).json('unable to add task'))
		} else {
			res.status(400).json('no such user or list');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleAddingTask: handleAddingTask
}
