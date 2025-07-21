import {supabase} from '../dbSql.js';

export async function getAllPlayers(req, res){
    try{
       const {data, error} = await supabase
       .from('players')
       .select('*')
       if(error){
           console.log({error});
       }
    
     res.status(200).json(data);    
    }
    catch(err){
        console.error("Error from getAllPlayers", err)
    }
}


export async function getUserById(req, res){
    try{
        const {name} = req.params;
        const {data, error} = await supabase
        .from('players')
        .select('*')
        .eq('username', name )
        .single()
        if(error){
            return res.status(500).json({ error: error.message });
        }
        if(!data){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(data);
    }
    catch(err){
        console.error("Error", err)
    }
    
}


export async function findUser(userName){
    try{
    const {data, error } = await supabase
        .from('players')
        .select('*')
        .eq('username', userName);

        if(error){
            return null;
        }
        if (!data || data.length === 0) {
            return null;
        }
        return data[0]
    }
     catch(err){
        console.error("Error", err)
    }
    
}


export async function insertInto(req, res){
    try{
        const {username, bestTime} = req.body;
        const user = await findUser(username);
        if(user === null){
            const {data, error} = await supabase
            .from('players')
            .insert({username, bestTime})
            .single();
            
            if(error){
                return res.status(500).json({ error: error.message });
            }
            return res.status(201).json({ message: 'Player inserted', player: data });
        }  
    }
    catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Server error' });
    }
}