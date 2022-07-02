import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
    const navigate = useNavigate();
useEffect(()=>{
const auth =localStorage.getItem('user') ;
if(auth){
navigate("/")
}
} , [])

    const Loginbutton = async () =>{
        console.log(email , password )
        let result = await fetch('http://localhost:5000/login' , {
            method :'post' ,
            body:JSON.stringify({email , password}),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem("user" , JSON.stringify(result.user));
            localStorage.setItem("token" , JSON.stringify(result.auth));
            navigate("/")
        }else{
            alert("please enter connect details")
        }
    }
    return(
    <div>
        <h1>Login</h1>
        

            <input className='inputboxone' type='text' placeholder='Enter Email-id'
            onChange={(e)=>setEmail(e.target.value)} />

            <input className='inputboxone' type='password' placeholder='Enter your password'
            onChange={(e)=>setPassword(e.target.value)}/>

            <button onClick={Loginbutton} className='signupbtnone' type='button' >Login </button>
    </div>
)}
export default Login
