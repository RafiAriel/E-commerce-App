import React, {useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import {Bar, Logo} from './NavBar.styles';
import {UserContext, CartContext} from '../../utils/ObjectContext';
import axios from "axios";
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const NavBar = () => {

	let navigate = useNavigate();
	const alert = useAlert();

	const {setCurrentCart} = useContext(CartContext);
	const {currentUser,setCurrentUser} = useContext(UserContext);

	// logout function ... 
	const logout = async (e) => {
		try {
		  e.preventDefault();
		  const requestedData = await axios.get("/users/logout");
		  const result = requestedData.data;
		  if(result === 'OK')
		  {
			setCurrentUser({user: {}});
			setCurrentCart({cart:[]})
			alert.success("Logout completed successfully!");
			navigate('/');
		  }
		}
		catch(error)
		{
		}
	  };	
	  
	return (
		<>
		<Bar>
		<Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand as={Link} to="/">
				<Logo><span>Ecommerce App</span></Logo>
			</Navbar.Brand>
			{
				(Object.keys(currentUser.user).length !== 0) ? ( 
				<> 

				<Nav.Link as={Link} to="/" onClick={logout}>
				(Hello, {currentUser.user.username}) <i className='fas fa-sign-out-alt'></i> logout
				</Nav.Link>
				
				<Nav.Link as={Link} to="/Cart" >
				<i className="fas fa-shopping-cart"></i> Cart
				</Nav.Link>
				</>
				) : 
				(
				<> 
				<Nav.Link as={Link} to="/Register">
				<i className='fas fa-registered fa-lg'></i> Register
				</Nav.Link>

				<Nav.Link as={Link} to="/Login">
				<i className="fas fa-user"></i> Login
				</Nav.Link>
				</>
				)
			}
	  </Navbar>
	  </Bar>
	  </>
	);
};

export default NavBar;
