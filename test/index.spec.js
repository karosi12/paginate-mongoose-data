"use strict";
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Paginate = require('../index').paginate
const FactoryGirl = require('./factory/index').FactoryGirl;
const UserModel = require('./factory/index').User;
let mongodb = 'mongodb://127.0.0.1/testdb';
let factoryUser;
describe("#Paginate-mongoose", () => {
    before(async () => {
        await mongoose.connect(mongodb);
        await mongoose.connection.db.dropDatabase()
        factoryUser = await FactoryGirl.buildMany('User', 10);
    });
    describe("#Seed user", () => {
        it("#Insert some user data on the db", async () => {
            try {
                await UserModel.insertMany(factoryUser);
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        });

        it("#Paginate data", async () => {
            try {
                const users = await Paginate(UserModel);
                expect(users.data.length).to.eql(10);
                await mongoose.connection.db.dropDatabase();
                await mongoose.disconnect();
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        });
    });
});
