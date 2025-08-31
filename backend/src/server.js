 

import express, { json } from 'express';  
import cors from 'cors';    
import transactionRoute from './routes/transactionRoute.js';

const app = express();

app.use(json());
app.use("/api/transactions",transactionRoute)


app.use(cors({
    origin: 'http://localhost:3000',  
    methods: 'GET,POST,PUT,DELETE',
    credentials: true 
})); 
app.listen(5000, () => {
    console.log('Server is running on port 5000');
    
});