let mongoose = require('mongoose');
const FactoryGirl = require('factory-girl').factory;
const faker = require('faker');
let UserSchema = new mongoose.Schema({ userName: String });
let User = mongoose.model('User', UserSchema);


FactoryGirl.define('User', User, {
	userName: faker.internet.userName
});

module.exports = {FactoryGirl, User}