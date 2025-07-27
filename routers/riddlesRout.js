import express from 'express';
import { getAllRiddles,
         creatNewRiddle,
         updateRiddle,
         deleteRiddle,
         getById
 } from '../ctrls/riddleCTRL.js';
import {verifyToken, checkAdminOrUser, checkAdmin} from '../middlewrs/authMiddleware.js'

const router = express.Router();



router.get('/riddles/getAllRiddles',verifyToken, checkAdminOrUser, getAllRiddles);


router.get('/riddles/getById/:id',verifyToken, checkAdminOrUser, getById)


router.post('/riddles/creatNewRiddle',verifyToken, checkAdminOrUser, creatNewRiddle);


router.put('/riddles/updateRiddle/:id',verifyToken, checkAdmin, updateRiddle)


router.delete('/riddles/deleteRiddle/:id',verifyToken,checkAdmin, deleteRiddle)

export default router;

