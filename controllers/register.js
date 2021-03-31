const handleRegister = (req, res, db, bcrypt, saltRounds) => {
	const { email, first_name, last_name, password } = req.body;
	// creating hash for password
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	// form validation
	if ( !email || !first_name || !last_name || !password) {
		return res.status(400).json('incorrect form submission');
	}
	// updating login and users tables in the database
	db.transaction(trx => {
		trx.insert({
			first_name: first_name,
			last_name: last_name,
			email: email,
			joined: new Date()
		})
		.into('users')
		.returning('email')
		.then(loginEmail => {
			return trx('login')
				.returning('email')
				.insert ({
					hash: hash,
					email: loginEmail[0] 
				})
				.then(userEmail => {
					userInfo = {
						first_name: first_name, 
						last_name: last_name,
						email: email, 
						lists: [], 
						tasks: []
					};
					res.json(userInfo);						
				})				
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => {
		res.status(400).json('unable to register');
		console.log(err);
	})
}

module.exports = {
	handleRegister: handleRegister
};