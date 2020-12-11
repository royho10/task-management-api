handleChangingListName = (req, res, db) => {
	const { email, list_id, new_title } = req.body;
	db.select('*').from('users').where('email', email)
	.then(user =>{
		// if there is such user
		if (user.length) {
			db('lists').where('list_id', list_id).andWhere('email', email)			
			.update({
				title: new_title
			})
			.returning('*')			
			.then(list => {
				// returning all lists
				db.select('*').from('lists').where('email', email).orderBy('list_id')
				.then(lists => {
					res.json(lists)
				})				
			})
			.catch(err => res.status(400).json('something went wrong'))
		} else {
			res.status(400).json('no such user');
		}
	})
	.catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
	handleChangingListName: handleChangingListName
}
