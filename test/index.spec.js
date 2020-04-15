"use strict";
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Paginate = require('../index').paginate
const FactoryGirl = require('./factory/index').FactoryGirl;
const UserModel = require('./factory/index').User;
const CategoryModel = require('./factory/index').Category;
const MusicModel = require('./factory/index').Music;
let mongodb = 'mongodb://127.0.0.1/testdb';
let factoryUser, factoryMusic, factoryCategory, music, userName;
describe("#Paginate-mongoose", () => {
    before(async () => {
        await mongoose.connect(mongodb);
        await mongoose.connection.db.dropDatabase()
        factoryUser = await FactoryGirl.buildMany('User', 30);
        factoryCategory = await FactoryGirl.attrs('Category');
        factoryMusic = await FactoryGirl.attrs('Music');
    });
    describe("#Seed user", () => {
        it("#Insert some user data", async () => {
            try {
                const users = await UserModel.insertMany(factoryUser);
                userName = users[0].userName;
                const userId = users[0]._id;
                factoryCategory = Object.assign({}, factoryCategory, {userId})
                const cat = await CategoryModel.create(factoryCategory);
                const categoryId = cat._id;
                factoryMusic = Object.assign({}, factoryMusic, {userId, categoryId});
                music = await MusicModel.create(factoryMusic);
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });

        it("#Paginate data, Model", async () => {
            try {
                // Paginate data, parameter Model
                const users = await Paginate(UserModel);
                expect(users.data.length).to.eql(20);
                expect(users.error).to.eql(false);
                expect(users.statusCode).to.eql(200);
                expect(users.message).to.eql('Records retrieved successfully');
                expect(users).to.have.property('meta');
                expect(users.meta).to.have.property('page');
                expect(users.meta).to.have.property('perPage');
                expect(users.meta).to.have.property('previousPage');
                expect(users.meta).to.have.property('nextPage');
                expect(users.meta).to.have.property('pageCount');
                expect(users.meta).to.have.property('total');
                expect(users.meta.total).to.equals(30);
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });
        it("#Paginate data, limit", async () => {
            try {
                // Paginate data, parameters Model, page number, data limit
                const data = {currentpage: 0, limit: 5};
                const users = await Paginate(UserModel,data);
                expect(users.data.length).to.eql(5);
                expect(users.error).to.eql(false);
                expect(users.statusCode).to.eql(200);
                expect(users.message).to.eql('Records retrieved successfully');
                expect(users).to.have.property('meta');
                expect(users.meta).to.have.property('page');
                expect(users.meta).to.have.property('perPage');
                expect(users.meta).to.have.property('previousPage');
                expect(users.meta).to.have.property('nextPage');
                expect(users.meta).to.have.property('pageCount');
                expect(users.meta).to.have.property('total');
                expect(users.meta.total).to.equals(30);
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });
        it("#Paginate data, next page", async () => {
            try {
                // Paginate data, parameters Model, page number
                const data = {currentpage: 1};
                const users = await Paginate(UserModel, data);
                expect(users.data.length).to.eql(10);
                expect(users.error).to.eql(false);
                expect(users.statusCode).to.eql(200);
                expect(users.message).to.eql('Records retrieved successfully');
                expect(users).to.have.property('meta');
                expect(users.meta).to.have.property('page');
                expect(users.meta).to.have.property('perPage');
                expect(users.meta).to.have.property('previousPage');
                expect(users.meta).to.have.property('nextPage');
                expect(users.meta).to.have.property('pageCount');
                expect(users.meta).to.have.property('total');
                expect(users.meta.total).to.equals(30);
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });

        it("#Paginate data, search", async () => {
            try {
                // Paginate data, parameters Model, search
                const data = {currentpage: 0, limit: 5, criteria: {userName}};
                const users = await Paginate(UserModel, data);
                expect(users.error).to.eql(false);
                expect(users.statusCode).to.eql(200);
                expect(users.message).to.eql('Records retrieved successfully');
                expect(users).to.have.property('meta');
                expect(users.meta).to.have.property('page');
                expect(users.meta).to.have.property('perPage');
                expect(users.meta).to.have.property('previousPage');
                expect(users.meta).to.have.property('nextPage');
                expect(users.meta).to.have.property('pageCount');
                expect(users.meta).to.have.property('total');
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });

        it("#Paginate nested data", async () => {
            try {
                const populateField = [
                    {
                      path: "userId",
                      select: "userName"
                    },
                    {
                      path: "categoryId",
                      select: "name",
                      populate: { 
                          path: 'userId'
                        }
                    }
                  ];
                const music = await Paginate(MusicModel, {populateField});
                expect(music.error).to.eql(false);
                expect(music.statusCode).to.eql(200);
                expect(music.message).to.eql('Records retrieved successfully');
                expect(music).to.have.property('meta');
                expect(music.meta).to.have.property('page');
                expect(music.meta).to.have.property('perPage');
                expect(music.meta).to.have.property('previousPage');
                expect(music.meta).to.have.property('nextPage');
                expect(music.meta).to.have.property('pageCount');
                expect(music.meta).to.have.property('total');
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });
    });
});
