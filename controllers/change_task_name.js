handleChangingTaskName = (req, res, db) => {
	const { email, new_title, task_id } = req.body;
	db.select('*').from('users').where('email', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			db('tasks').where('task_id', task_id).andWhere('email', email)			
			.update({
				title: new_title
			})
			.returning('*')			
			.then(newTask => {
				// returning all tasks
				db('tasks').where('email', email).orderBy('task_id')
				.then(tasks => {
					res.json(tasks)
				})	
			})					
			.catch(err => res.status(400).json('no such task'))
		} else {
			res.status(400).json('no such user');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleChangingTaskName: handleChangingTaskName
}