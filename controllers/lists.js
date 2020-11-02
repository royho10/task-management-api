handleAddingList = (req, res, db) => {
	const { email, title } = req.body;
	db.select('*').from('users').where('email', '=', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			db('lists')			
			.insert({
				email: email,
				title: title,
			})
			.returning('listID')			
			.then(listID => {
				db.select('*').from('lists')
				.where('listID', '=', JSON.stringify(listID))
				//.increment('listCount', 1)
				.then(something => {
					res.json(something)
				})				
			})
		} else {
			res.status(400).json('no such user');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleAddingList: handleAddingList
}

