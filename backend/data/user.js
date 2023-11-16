const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function add(data) {
	const storedData = await readData();
	const userId = generateId();
	const hashedPw = await hash(data.password, 12);
	if (!storedData.users) {
		storedData.users = [];
	}
	storedData.users.push({ ...data, password: hashedPw, id: userId });
	await writeData(storedData);
	return { id: userId, email: data.email };
}

async function get(email) {
	const storedData = await readData();
	if (!storedData.users || storedData.users.length === 0) {
		throw new NotFoundError('사용자를 찾을 수 없습니다 😵');
	}

	const user = storedData.users.find((ev) => ev.email === email);
	if (!user) {
		throw new NotFoundError(
			'해당 이메일을 가진 사용자를 찾을 수 없습니다 😵' + email
		);
	}

	return user;
}

exports.add = add;
exports.get = get;
