import React, { useState } from "react";
import axios from "axios";
import { CustomWrapper, CustomContent } from '../Register/Register.styles';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';

const Register = () =>
{ 
  const alert = useAlert();
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
      username: "",
      email: "",
      password: "",
      password2: ""
    });


  const usernameHandler = (e) => {
    setUserData({ ...userData, username: e.target.value });
  };

  const emailHandler = (e) => {
    setUserData({ ...userData, email: e.target.value });

  };

  const passwordHandler = (e) => {
    setUserData({ ...userData, password: e.target.value });

  };

  const passwordHandler2 = (e) => {
    setUserData({ ...userData, password2: e.target.value });

  };

  const submitHandler = async (e) => {
   try {
      e.preventDefault();
      const requestedData = await axios.post("/users/register", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        password2: userData.password2
      });
      const result = requestedData.data;
      if(result === 'OK')
      {
        alert.success("Registration completed successfully!");
        navigate('/');
      }
      else
      {
        for (let index = 0; index < result.length; index++) {
          alert.error(result[index].msg);
        }
      }
    }
    catch(error)
    {

    }

  };

    return(
        <>
        <CustomWrapper>
            <CustomContent>
            <h1>Register</h1> 
            <form>
                <div className="inputContainer">
                    <i className="fa fa-user icon"> </i>
                    <input className="Field" name="name" type="hidden" value="null" placeholder="name" />

                    <input className="Field" name="username" type="text" placeholder="Username" onChange={usernameHandler} />
                </div>
                <div className="inputContainer">
                    <i className="fa fa-envelope icon"> </i>
                    <input className="Field" name="email" type="text" placeholder="Email" onChange={emailHandler} />
                </div>
                <div className="inputContainer">
                    <i className="fa fa-key icon"> </i>
                    <input className="Field" name="password" type="password" placeholder="Password" onChange={passwordHandler} />
                </div>

                <div className="inputContainer">
                    <i className="fa fa-key icon"> </i>
                    <input className="Field" name="password2" type="password" placeholder="Confirm Password" onChange={passwordHandler2} />
                </div>

                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={submitHandler}>Register</button>
                </div>
                </form>
            </CustomContent>  
        
        </CustomWrapper>
        </>
    );
}

export default Register;
