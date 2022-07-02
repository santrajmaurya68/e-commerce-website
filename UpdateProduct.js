import {useEffect, useState } from 'react'
import {useParams , useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name ,setName] = useState('') ;
    const [price ,setPrice] = useState('') ;
    const [category ,setCategory] = useState('') ;
    const [company ,setCompany] = useState('') ;
   const params = useParams() ;
   const navigate = useNavigate()

   useEffect(()=>{
    getProductDetails();
   } , [])
  
const getProductDetails = async () =>{
    console.log(params)
    let result = await fetch(`http://localhost:5000/product/${params.id}` , {
        headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json() ;
    console.log(result)
   setName(result.name)
   setPrice(result.price)
   setCategory(result.category)
   setCompany(result.company)
}

    const Updateproduct = async () =>{
        console.log(name , price , category , company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
    method : 'Put' ,
    body: JSON.stringify({name , price , category , company}),
   headers : {
    'Content-Type' : "application/json" ,
    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`

   }
      });
      result = await result.json() ;
      console.log(result)
      navigate('/')
    }
    return (
        <div>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputboxoneaddproduct'
            onChange={(e)=>setName(e.target.value)} value={name} />
            
            <input type="text" placeholder='Enter product price' className='inputboxoneaddproduct'
          onChange={(e)=>setPrice(e.target.value)} value={price}   />
                      
            <input type="text" placeholder='Enter product category' className='inputboxoneaddproduct' 
           onChange={(e)=>setCategory(e.target.value)} value={category} />
                       
            <input type="text" placeholder='Enter product company' className='inputboxoneaddproduct' 
           onChange={(e)=>setCompany(e.target.value)} value={company} />
            <button className='signupbtnone' type='button' onClick={Updateproduct}>Update Product</button>
        </div>
    )
}
export default UpdateProduct

