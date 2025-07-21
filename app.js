import express from 'express';
import riddlesRout from './routers/riddlesRout.js' 
import playerRout from './routers/playerRout.js'

const app = express();

app.use(express.json());
app.use('/', riddlesRout);
app.use('/players', playerRout);


app.listen(3000, () => {
    console.log('server runing on port 3000')
});

