import express from 'express';
import {getAllPlayers,insertInto,getUserById, updatePlayer} from '../ctrls/playerCTRL.js'


const router = express.Router();

router.get('/getAllPlayers', getAllPlayers);
router.post('/insertInto', insertInto);
router.put('/update/:id', updatePlayer);
router.get('/getUserById/:id', getUserById)

export default router;