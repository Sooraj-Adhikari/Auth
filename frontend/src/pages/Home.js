import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {

const [loggedInUser,setLoggedInUser]=useState('');
const [products,setProducts]=useState('');

const navigate=useNavigate();

useEffect(()=>{

    setLoggedInUser(localStorage.getItem('loggedInUser'));

},[])

const handleClick=()=>{
   
   
    localStorage.removeItem('loggedInUser');
localStorage.removeItem('token');
 handleSuccess("User log out successfully");

setTimeout(() => {
     navigate('/login');
}, 1000);
}

const fetchProducts=async ()=>{
 try {
       const url="http://localhost:5000/products";

    const response=await fetch(url,{
        method:"GET",
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })

    const result=await response.json()
    setProducts(result);

   console.log(result);
 } catch (error) {
    handleError(error);
 }
}

useEffect(()=>{

fetchProducts();

},[])


  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleClick}>Log Out</button>

      <div>{products && products.map((item,index)=>(
            
            <ul key={index}>
              <span >{item.Device} : {item.Price}</span>
           
           </ul>
      ))}</div>
      
        <ToastContainer/>
    </div>
     
  )
}

export default Home
