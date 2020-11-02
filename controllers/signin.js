const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data =>{
		// comparring between the password that was written to the hash
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user);
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