import {useState} from 'react'

const AddProduct = () => {
    const [name ,setName] = useState('') ;
    const [price ,setPrice] = useState('') ;
    const [category ,setCategory] = useState('') ;
    const [company ,setCompany] = useState('') ;
    const [error , setError] = useState('');
    const addproduct = async () =>{
        console.log(name , price , category , company);
        console.log(!name)
        if(!name || !price || !category || !company){
            setError(true) 
            return false
        }
       const userId = JSON.parse(localStorage.getItem('user'))._id;
       let result = await fetch("http://localhost:5000/add-product" , {
        method : 'post',
        body: JSON.stringify({name , price , category , company ,userId}),
        headers : {
            "Content-Type" : "application/json"
        }
       });
       result = await result.json();
      console.log(result)
    }
    return (
        <div>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputboxoneaddproduct'
            onChange={(e)=>setName(e.target.value)} value={name} />
            {error && !name && <span>Enter valid name</span>}
            <input type="text" placeholder='Enter product price' className='inputboxoneaddproduct'
          onChange={(e)=>setPrice(e.target.value)} value={price}   />
                      {error && !price && <span>Enter valid price</span>}
            <input type="text" placeholder='Enter product category' className='inputboxoneaddproduct' 
           onChange={(e)=>setCategory(e.target.value)} value={category} />
                       {error && !category && <span>Enter valid category</span>}
            <input type="text" placeholder='Enter product company' className='inputboxoneaddproduct' 
           onChange={(e)=>setCompany(e.target.value)} value={company} />
                       {error && !company && <span>Enter valid company</span>}
            <button className='signupbtnone' type='button' onClick={addproduct}>Add Product</button>
        </div>
    )
}
export default AddProduct
