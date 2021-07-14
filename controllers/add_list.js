handleAddingList = (req, res, db) => {
	const { email, title } = req.body;
	db.select('*').from('users').where('email', '=', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			db('lists')			
			.insert({
				email: email,
				title: title
			})
			.returning('*')
			.then(list => {
				db.select('*').from('lists').where('email', '=', email).orderBy('list_id')			
				.then(lists => {
						res.json(lists)
				})				
			})	
			.catch(err => res.status(400).json('unable to add list'))
		} else {
			res.status(400).json('no such user');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleAddingList: handleAddingList
}

