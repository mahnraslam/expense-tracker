import express from "express"
import  transaction from "../controllers/transaction.js";  

const router = express.Router()
const  {addTransaction,getTransactions, deleteTransaction}  = transaction ;
 

router.get('/', (req, res) => {
  
getTransactions()
.then(response=>{ 
    res.json(response.rows);
  })
  .catch(err => {
     res.json({message : err}) ;
  })
}) 


router.delete('/:id', (req, res) => {
  deleteService(req.params.id)
  .then(response=>{ 
    res.json({message:response});
  })
  .catch(err => {
     res.json({message : err}) ;
  })
})


router.post('/', async(req, res) => {
  await addService(req.body)
  .then(response=>{ 
    res.json({message: response});
  })
  .catch(err => {
     res.json({message : err.message}) ;
  })
});
router.put('/:id', async(req, res) => {
  await updateService(req.body, req.params.id)
    .then(response=>{ 
    console.log("completed", response) ;
    res.json({message: response});
  })
  .catch(err => {
     res.json({message : err.message}) ;
  })
}); 
 
export default router 