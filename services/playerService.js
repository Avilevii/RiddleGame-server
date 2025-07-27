import { connect } from "../db.js";
import bcrypt from 'bcrypt';

export async function collectionFn(){
    const db = await connect();
    return db.collection('players');
}


export async function collectionDb(){
    const db = await connect();
    return db.collection('users');
}


export async function hashBcrypt(password){
    const hashPassord = await bcrypt.hash(password, 10);
    return hashPassord;
}