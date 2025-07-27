import jwt from 'jsonwebtoken';
import {hashBcrypt, collectionDb} from '../services/playerService.js';
import bcrypt from 'bcrypt'
import env from 'dotenv';
env.config();


export function creatToken(payload, secetKey, times){
    const token = jwt.sign(payload, secetKey, times);
    return token;
}


export async function signup(req, res){
    const {username, password} = req.body;
    try{
        if(!username || !password){
            return res.status(403).json({msg: "You must enter values"})
        }
        const hashPassword = await hashBcrypt(password);
        const collection = await collectionDb();
        const exist = await collection.findOne({username});
        if(exist){
            return res.status(400).json({massege: "The name is not valid"})
        }        
        const result = await collection.insertOne({
            username,
            password: hashPassword,
            role: "Guest"
        });
        return res.status(200).json({msg: "Your use inserted", username, hashPassword});
    }
    catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Server error' });
    }
}

export async function login(req, res){
    const {username, password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({msg: "You must enter values"});
        }
        const collection = await collectionDb();
        const payload = await collection.findOne({username})
        if(payload === null){
            return res.status(400).json({nsg: "The user is not exist!"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, payload.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Incorrect password" });
        }
        const token = jwt.sign({username: payload.username , role: payload.role}, process.env.SECRET_KEY, {expiresIn: "1d"});
        return res.status(200).json({token});
    }
    catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
    }
}