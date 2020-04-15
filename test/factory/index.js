const mongoose = require('mongoose');
const { Schema } = mongoose;
const FactoryGirl = require('factory-girl').factory;
const faker = require('faker');
const UserSchema = new mongoose.Schema({ userName: String });
const User = mongoose.model('users', UserSchema);
const CategorySchema = new mongoose.Schema({ name: String, 
	userId: { type: Schema.Types.ObjectId, ref: "users" } });
const Category = mongoose.model('categories', CategorySchema);
const MusicSchema = new mongoose.Schema({ 
	title:{ type: String },
	musicUrl:{ type: String },
	userId: { type: Schema.Types.ObjectId, ref: "users" },
	categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
});
const Music = mongoose.model('musics', MusicSchema);

FactoryGirl.define('User', User, {
	userName: faker.internet.userName
});

FactoryGirl.define('Category', Category, {
	name: faker.random.word,
});

FactoryGirl.define('Music', Music, {
	title: faker.random.word,
	musicUrl: faker.image.imageUrl,
});
module.exports = {FactoryGirl, User, Music, Category}