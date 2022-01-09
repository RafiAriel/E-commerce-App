import React, {useState} from "react";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { GlobalStyle } from "./GlobalStyle";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProductsByCat, Product }  from './components/Products';
import Register from "./components/Register";
import TabsMenu from './components/TabsMenu';
import Login from "./components/Login";
import {UserContext, CartContext} from './utils/ObjectContext';
import Checkout from './components/Checkout';

const App = () => {

  const [currentUser, setCurrentUser] = useState({user: {}});
  const [currentCart, setCurrentCart] = useState({cart: []});

  return (
    <>
    <CartContext.Provider value={{ currentCart, setCurrentCart }}>
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
    <Router>
    <GlobalStyle/>
    <Routes>

    <Route path='/' element={<> <NavBar/> <TabsMenu/> <ProductsByCat/> </>} />
    <Route path='/:category' element={<> <NavBar/> <TabsMenu/> <ProductsByCat/> </>} />
    <Route path='/products/:slug' element={<> <NavBar/> <TabsMenu/> <Product/> </> } />
    <Route path='/register' element={<> <NavBar/> <Register/> </>} />
    <Route path='/login' element={<> <NavBar/> <Login/> </>} />
    <Route path='/cart' element={<> <NavBar/> <Checkout />  </>} />
    
    </Routes>
    </Router>
    </UserContext.Provider>
    </CartContext.Provider>
    </>
  );
};

export default App;
