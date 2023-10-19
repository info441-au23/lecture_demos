import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function getDb() {
    if(!db) {
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database
        });
        await seedDb(db);
    }

    return db;
};

async function seedDb(db) {
    await db.exec('create table spies (first_name text, last_name text)');
    await db.exec(`insert into spies VALUES
        ("James", "Bond"),
        ("George", "Smiley"),
        ("Jason", "Bourne"),
        ("Jack", "Ryan"),
        ("Jack", "Reacher")
    `);

    await db.exec('create table secret_table (message text)');
    await db.exec(`insert into secret_table VALUES
        ("James's password is: l2k007"),
        ("The location of the noc list is on floor 3") 
    `)
}