import express from 'express';
import {getAllPlayers,insertInto,getUserById} from '../ctrls/playerCTRL.js'


const router = express.Router();

router.get('/', getAllPlayers);
router.post('/insertInto', insertInto);
// router.put('update', playersCtrl.update);
// router.get('getUserById/:userName', getUserById)

export default router;