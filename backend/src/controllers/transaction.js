 
import dotenv from "dotenv"
import { Client } from 'pg'; 

dotenv.config();
const con = new Client({
    user:  "postgres",
    host:  process.env.PGHOST, 
    database:  process.env.PGDATABASE_NAME,
    password:  process.env.PGPASSWORD,
    port:  process.env.PGDB_PORT  
}); 
const getSummary = async(user_id)=>{
    const id = parseInt(user_id, 10);
    try { 
        const balance  = await con.query("Select SUM(amount) as total_amount, category from transaction where user_id=$1 GROUP BY category",[id]) ;       
        const income = await con.query("Select SUM(amount) as income from transaction where user_id=$1 AND amount>0",[id]) ;
        const expense = await con.query("Select SUM(amount) as expense from transaction where user_id=$1 AND amount<0",[id]) ;
        return {balance:balance.rows, income:income.rows[0].income, expense:expense.rows[0].expense} ;
    }   
    catch(err){
        console.error(err) ;
        throw new Error("Internal server error") ;
    }
    }
const getTransactions = async(user_id)=>{
    const id = parseInt(user_id, 10);
    try { 
        const result = await con.query("Select * from transaction where id=$1  order by created_at desc",[id]) ;
        return result ;  
    }
    catch(err){
        console.error(err) ;
        throw new Error("Internal server error") ; 
    }
}
const updateTransactions = async(transactions, s_id)=>{
    try { 
        
        const t_id = parseInt(s_id, 10); 
        
        const {id,user_id, amount, created_at,category} = transactions ;
        const query = `Update transaction set  id = $1,
                        user_id=$2,
                        amount = $3,
                        created_at = $4,
                        category=$5
                            where transactions_id=$6`;
        const values = [id,user_id, amount, created_at,category,t_id] ;
        await con.query(query,values) ;
        return "Sucessfully updated" ;
    }
    catch(err){
        console.error(err) ;
        throw new Error("Internal server error") ; 
    }
}

const addTransaction = async(input)=>{ 
    try {  
        input.user_id = parseInt(input.user_id, 10);
        input.amount = parseInt(input.amount, 10);
        const  {user_id,category,amount,created_at} = input ;
        const query = `Insert into  transaction (user_id,category,amount,created_at) Values ($1,$2,$3,$4)`;  
        const values = {user_id,category,amount,created_at}
        await con.query(query,values) ;
        return "Sucessfully added" ;
    }
    catch(err){
        console.error(err) ;
        throw new Error("Internal server error") ; 
    }
}

const deleteTransaction = async(s_id)=>{
    try { 
        const id = parseInt(s_id, 10);
        console.log("Deleting", id) ;
        const result =  await con.query(`Delete from transactions where transactions_id = $1`,[id]) ;  
        if (result.rowCount === 0) {
            throw new Error("transactions not found");
        }
        return "Success" ;
    }
    catch(err){ 
        throw new Error("Internal server error") ; 
    }
}
export default {addTransaction,getTransactions, deleteTransaction} ;

 

con.connect()
  .then(() => console.log('Connected to the Database'))
 .catch(err => console.error('Connection error', err.stack));

 