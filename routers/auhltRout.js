import express from 'express';
import {signup, login} from '../ctrls/aulthCTRL.js';

const router = express.Router();

router.post('/riddles/signup', signup);
router.post('/riddles/login', login);


export default router;