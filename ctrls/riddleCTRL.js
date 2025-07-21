import { connect } from "../db.js";
import { ObjectId } from "mongodb";


export async function getAllRiddles(req, res) {
    try{
        const db = await connect();
    const collection = db.collection("riddles")
    const allRiddles = await collection.find().toArray();
    res.json(allRiddles);
    }
    catch(err){
        console.error(err)
        res.status(500).json({Error: "הבקשה נכשלה"});        
    }
}


export async function getById(req, res){

}


export async function creatNewRiddle(req, res){
    try{
        const data = req.body;
        if(!data){
            return res.status(400).json({msg: "you nust to in data!"})
        }
        const db = await connect();
        const collection = db.collection('riddles');
        const result = await collection.insertOne(data);
        res.status(201).json({ message: "the report is inserted!", id: result.insertedId });
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: "Error in save"});
    }


     
}


export async function updateRiddle(req, res){
        try{
        const db = await connect();
        const collection = db.collection('riddles');

        const {id} = req.params;
        const data = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectId(id)},
            {$set: data}
        );

        if(result.modifiedCount === 0){
            return res.status(404).json({ msg: 'Riddle not found or already confirmed' });

        }
        res.json({msg: "המסמך עודכן בהצלחה!"})
    }
    catch(err){
          console.error(err)
        res.status(500).json({error: " העדכון נכשל "});
    }
}

export async function deleteRiddle(req, res){
    const {id} = req.params;
    try{
       
        const db =  await connect();
        const collection = db.collection("riddles");
        const result =  await collection.deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount === 0) {
        return res.status(404).json({ msg: "Report not found" });
        }
        res.json({msg: "המחיקה הצליחה"})
    }
    catch(err){
          console.error(err)
        res.status(500).json({error: " המחיקה נכשלה "});
    }
}



