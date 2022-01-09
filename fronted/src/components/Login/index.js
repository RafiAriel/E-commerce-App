import React, { useState, useContext } from "react";
import axios from "axios";
import { CustomWrapper, CustomContent } from "../Register/Register.styles";
import { useAlert } from 'react-alert';
import {UserContext} from '../../utils/ObjectContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const Login = () =>
{
  let navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext);
  const alert = useAlert();

  const [userData, setUserData] = useState({
      username: "",
      password: ""
    });


  const usernameHandler = (e) => {
    setUserData({ ...userData, username: e.target.value });
  };

  const passwordHandler = (e) => {
    setUserData({ ...userData, password: e.target.value });

  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      const requestedData = await axios.post("/users/login", {
        username: userData.username,
        password: userData.password
      });
      const result = requestedData.data;
      setCurrentUser({user: result});
      if(typeof result === 'object')
      {
        alert.success("Login completed successfully!");
        navigate('/');
      }
      else
      {
        alert.error("The username or password is incorrect");
      }
    }
    catch(error)
    {
    }

  };

    return (
        <>
        <CustomWrapper>
        <CustomContent>
        <h1>Login</h1>
        <form>
            <div className="inputContainer">
                <i className="fa fa-user icon"> </i>
                <input className="Field" name="username" type="text" placeholder="Username" onChange={usernameHandler} />
            </div>
            
                <div className="inputContainer">
                    <i className="fa fa-key icon"> </i>
                    <input className="Field" name="password" type="password" placeholder="Password" onChange={passwordHandler} />
                </div>

                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={submitHandler}>Login</button>
                </div>
                </form>

                <br/>
                <div className="CreateNewAccount">Do not have an account? <br/> <Link to='/Register'> Create a new account </Link></div>

        </CustomContent>
        </CustomWrapper>
        </>
    );

}

export default Login;