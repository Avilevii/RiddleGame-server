import express from 'express';
import riddlesRout from './routers/riddlesRout.js'; 
import playerRout from './routers/playerRout.js';
import aulthRout from './routers/auhltRout.js';

const app = express();

app.use(express.json());
app.use('/', riddlesRout);
app.use('/players', playerRout);
app.use('/', aulthRout)

app.listen(3000, () => {
    console.log('server runing on port 3000')
});

