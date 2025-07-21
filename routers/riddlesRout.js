import express from 'express';
import { getAllRiddles,
         creatNewRiddle,
         updateRiddle,
         deleteRiddle,
         getById
 } from '../ctrls/riddleCTRL.js';

const router = express.Router();



router.get('/riddles/getAllRiddles', getAllRiddles);


router.get('/riddles/getById/:id', getById)


router.post('/riddles/creatNewRiddle', creatNewRiddle);


router.put('/riddles/updateRiddle/:id', updateRiddle)


router.delete('/riddles/deleteRiddle/:id', deleteRiddle)

export default router;

