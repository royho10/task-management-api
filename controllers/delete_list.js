handleDeletingListName = (req, res, db) => {
	const { email, list_id } = req.body;
	db.select('*').from('users').where('email', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			// delete all the tasks related to the list
			db('tasks').where('list_id', list_id).andWhere('email', email)
			.del()
			.returning('*')
			.then(del_tasks => {
				db('lists').where('list_id', list_id).andWhere('email', email)			
				.del()
				.returning('*')
				.then(list => {
					// if there is such list
					if (list.length) {
						db.select('*').from('lists').where('email', email).orderBy('list_id')			
						.then(lists => {
							res.json(lists)
						})
					} else {
						return res.status(400).json('no such list')
					}	
				})			
			})
						
			.catch(err => res.status(400).json('no such list'))
		} else {
			res.status(400).json('no such user');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleDeletingListName: handleDeletingListName
}
