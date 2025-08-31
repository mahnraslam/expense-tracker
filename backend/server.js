 

import express, { json } from 'express'; 
import { Client } from 'pg'; 
import cors from 'cors';   

const app = express();
app.use(json());


require("dotenv").config();
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: 'GET,POST,PUT,DELETE',
    credentials: true 
}));

const con = new Client({
    user: process.env.USER,
    host: process.env.HOST, 
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD ,
    port: process.env.DB_PORT  
});

app.get('/transactions', (req, res) => {
  
getTransactions()
.then(response=>{ 
    res.json(response.rows);
  })
  .catch(err => {
     res.json({message : err}) ;
  })
}) 


app.delete('/transactions/:id', (req, res) => {
  deleteService(req.params.id)
  .then(response=>{ 
    res.json({message:response});
  })
  .catch(err => {
     res.json({message : err}) ;
  })
})


app.post('/transactions', async(req, res) => {
  await addService(req.body)
  .then(response=>{ 
    res.json({message: response});
  })
  .catch(err => {
     res.json({message : err.message}) ;
  })
});
app.put('/transactions/:id', async(req, res) => {
  await updateService(req.body, req.params.id)
    .then(response=>{ 
    console.log("completed", response) ;
    res.json({message: response});
  })
  .catch(err => {
     res.json({message : err.message}) ;
  })
}); 

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});