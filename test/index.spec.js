"use strict";
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Paginate = require('../index').paginate
const FactoryGirl = require('./factory/index').FactoryGirl;
const UserModel = require('./factory/index').User;
let mongodb = 'mongodb://127.0.0.1/testdb';
let factoryUser, userName;
describe("#Paginate-mongoose", () => {
    before(async () => {
        await mongoose.connect(mongodb);
        await mongoose.connection.db.dropDatabase()
        factoryUser = await FactoryGirl.buildMany('User', 30);
    });
    describe("#Seed user", () => {
        it("#Insert some user data", async () => {
            try {
                const users = await UserModel.insertMany(factoryUser);
                userName = users[0].userName;
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
                const users = await Paginate(UserModel, 0, 5);
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
                const users = await Paginate(UserModel, 1);
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
                const users = await Paginate(UserModel, 0, 5, {userName});
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
    });
});
