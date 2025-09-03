import React from 'react'
import { useEffect, useState} from 'react'

const useTransaction = (user_id) => {
    const [transaction,setTransaction] = useState([])
    const API = "https://localhost:5000/api/transactions"
    useEffect(()=>{
        const fetchData = async()=>{
        try{
            const result = fetch(`API/${user_id}`) ;
            const data = result.json() ;
            setTransaction(data)
        }catch(e){
            console.error('Error in fetching',e)
        }
        }
        fetchData() ;
    },[user_id])

    useEffect(()=>{
        const fetchSummary = async()=>{
        try{
            const result = fetch(`API/summary/${user_id}`) ;
            const data = result.json() ;
            setSummary(data) ;
        }catch(e){
            console.error('Error in fetching',e)
        }
        }
        fetchSummary() ;
    },[user_id])
  return (
    <div>useTransaction</div>
  )
}

export default useTransaction