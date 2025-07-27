import { ObjectId } from 'mongodb';
import {collectionFn}from '../services/playerService.js';


export async function getAllPlayers(req, res){
    try{
        const collection = await collectionFn()
        const players = await collection.find().toArray();
        res.status(200).json(players);    
    }
    catch(err){
        console.error("Error from getAllPlayers", err)
        res.status(500).json({massage: "Server error"})
    }
}


export async function getUserById(req, res){
    try{
        const {id} = req.params;
        const playercollection = await collectionFn();
        const player = await playercollection.findOne({_id: new ObjectId(id) })
        if(! player){
            return res.status(404).json({masseg : 'Player not found!'});
        }
        res.status(200).json(player)
    }  
    catch(err){
        console.error("Error", err);
        res.status(500).json({message: "Server error"})
    }
}


export async function updatePlayer(req, res){
    const {id} = req.params;
    const {bestTime} = req.body;
    try{
        const collection = await collectionFn();
        if(! ObjectId.isValid(id) || bestTime === undefined){
            return res.status(400).json({msg: "Id  is not found"})
        }
        const player = await collection.findOne({_id: new ObjectId(id)})
        if(! player){
            return res.status(404).json({ message: "Player not found" });
        }
        const oldBest = Number(player.bestTime);
        const newBest = Number(bestTime);
        console.log("Old bestTime:", oldBest);
        console.log("New bestTime:", newBest);
        
        if(oldBest > newBest){
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { bestTime: newBest } }
            );
            return res.status(200).json({ message: "Best time updated!" });
    } else {
        return res.status(200).json({ message: "Best time not improved — no update made" });
    }
    }
    catch(err){
        console.error("Error", err)
        res.status(500).json({ message: "Server error" });
    }
}


export async function insertInto(req, res){
    try{
        const {username, bestTime, createdAt} = req.body;
        if(!username|| bestTime === undefined){
            return res.status(400).json({massege: "You must into value"})
        }
        const collection = await collectionFn();
        const exist = await collection.findOne({username});
        if(exist){
            return res.status(400).json({massege: "The name is not valid"})
        }        
        const result = await collection.insertOne({
            username,
            bestTime,
            createdAt: new Date(createdAt),
        })
        return res.status(201).json({ message: "Player inserted", id: result.insertedId });


    }
    catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Server error' });
    }
}