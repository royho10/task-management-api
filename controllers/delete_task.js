handleDeletingTaskName = (req, res, db) => {
	const { email, task_id } = req.body;
	db.select('*').from('users').where('email', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			db('tasks').where('task_id', task_id).andWhere('email', email)			
			.del()
			.returning('*')
			.then(task => {
				// if there is such task
				if (task.length) {
					db.select('*').from('tasks').where('email', email).orderBy('task_id')			
					.then(tasks => {
						res.json(tasks)
					})
				} else { 
					return res.status(400).json('something is wrong')
				}	
			})						
			.catch(err => res.status(400).json('no such task'))
		} else {
			res.status(400).json('no such user');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleDeletingTaskName: handleDeletingTaskName
}