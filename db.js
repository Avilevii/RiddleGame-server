import {config}from 'dotenv';
config();
import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.DB_CONCTION)
let db;

export async function connect(){
    if(!db){
        await client.connect();
        db = client.db("riddle_game");
        console.log("Conectded to mongo db")
    }
    return await db
}
connect();