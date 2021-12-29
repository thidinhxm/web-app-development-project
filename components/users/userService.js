const {models} = require('../../models');
const bcrypt = require('bcrypt');

exports.getUserByEmail = (email) => {
	return models.users.findOne({
		where: {
			email: email,
			is_blocked: false
		},
		include: [{
			model: models.userroles,
			as: 'userroles',
			attributes: [],
			where: {
				role_id: 3
			},
		}],
		raw: true
	});
}

exports.getAccountByEmail = (email) => {
	return models.users.findOne({
		where: {
			email: email,
		},
		raw: true
	});
}

exports.getUserById = (id) => {
	return models.users.findOne({
		where: {user_id: id},
		raw: true
	});
}
exports.createUser = (user) => {
	return models.users.create(user);
}

exports.createUserRole = (role) => {
	return models.userroles.create(role);
}
exports.updateUser = (user) =>{
	return models.users.update(
		{
			firstname: user.firstname, 
            lastname: user.lastname,
            email: user.email, 
            address: user.address, 
            phone: user.phone,
		}
		, {
		where: {user_id: user.user_id}
	});
}
exports.updatePassword = (id,newpassword) =>
{
	const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newpassword, salt);
	return models.users.update({
		password:passwordHash
	},
	{where:{user_id:id}})
}
exports.getUserByToken = (token) => {
	return models.users.findOne({
		where: {token: token},
		raw: true
	});
}

exports.getUserByEmailAndToken = (email, token) => {
	return models.users.findOne({
		where: {email: email, token: token},
		raw: true
	});
}