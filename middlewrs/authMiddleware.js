import jwt from 'jsonwebtoken';
import env from 'dotenv'
env.config();

export function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(403).json({msg: "You must enter Headers!!"})
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(err){
        console.error('Error from catch verifyToken', err);
        return res.status(401).json({ msg: "Invalid token" });
    }
}

export async function checkAdminOrUser(req, res, next){
    if(req.user.role !== 'ADMIN' && req.user.role !== 'USER'){
        res.status(400).json({msg: "מצטער בקשתך נכשלה🤕"});
    }
    next();
}

export async function checkAdmin(req, res, next){
    if(req.user.role !== 'ADMIN'){
        res.status(400).json({msg: "מצטער בקשתך נכשלה🤕"});
    }
    next();
}
