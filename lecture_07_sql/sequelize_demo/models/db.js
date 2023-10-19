import sqlite3 from 'sqlite3';
import { Sequelize, DataTypes } from 'sequelize';

let models;

export async function initialize() {
    const db = new Sequelize('sqlite::memory:');
    const Spy = db.define('Spy', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
    });
    await Spy.sync();

    models = {Spy};
    await seedSpies(Spy);
};

export const getModels = () => models;

async function seedSpies(Spy) {
    await Spy.create({first_name: "James", last_name: "Bond"});
    await Spy.create({first_name: "George", last_name: "Smiley"});
    await Spy.create({first_name: "Jack", last_name: "Reacher"});
    await Spy.create({first_name: "Jack", last_name: "Ryan"});
}