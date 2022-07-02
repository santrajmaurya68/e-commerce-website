import './App.css';
import React  from 'react'
import Navgation from './project/Navgation';
import {BrowserRouter , Routes ,Route } from "react-router-dom" ;
import Footer from './project/Footer';
import Signup from './project/Signup';
import PrivateComponent from './project/PrivateComponent';
import Login from './project/Login';
import AddProduct from './project/AddProduct'
import ProductList from './project/ProductList';
import UpdateProduct from './project/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navgation/>
      <Routes>

        <Route element={<PrivateComponent/>} >
        <Route path='/'element={<ProductList /> } />
        <Route path='/addProducts'element={<AddProduct/>} />
        <Route path='/update/:id'element={<UpdateProduct />} />
        <Route path='/logout'element={<h1>Logout Component</h1>} />
        <Route path='/profile'element={<h1>profile Component</h1>}/>
       </Route>

        <Route  path='/signup' element={< Signup/>} />
        <Route  path='/login' element={< Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

