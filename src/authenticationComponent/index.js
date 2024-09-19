import React, { useState } from "react";
import { Button, Input,Form,Alert } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { userToken,userConfig } from "../reducer";
import { useDispatch } from 'react-redux';

const AuthenticationComponet =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError]=useState(null);
    const [btnLoading, setBtnloading] =useState(false);
    const onFinish = async (values) => {
      setBtnloading(true);
      try {
        const response = await axios.post("https://backend-parcelbooking-6.onrender.com/api/login", values);
        if(response?.status === 200){
          dispatch(userToken(response.data.token));
          dispatch(userConfig(response.data?.user));
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userCofigData', JSON.stringify(response.data?.user));
          navigate("/layoutPercel/bookingtype");
          setBtnloading(false);
        }else{
          setError(response?.data?.message);
          setBtnloading(false);
        }
      } catch (error) {
        setBtnloading(false)
        setError(error?.response?.data?.message);
      }
    };
    
      const onFinishFailed = (errorInfo) => {
      };
      const handleSignUpClick = () => {
        navigate("/rigister");
      };

    return(<div className="content-center">
      <div className="login-container">
       {error &&<Alert message={error} style={{color:'red',textAlign:'center'}}/>}
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2>Login</h2>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button" loading={btnLoading} block>
            Login
          </Button>
          <p style={{ marginTop: 5 }}>
      You don't have an account? Please{" "}
      <span 
        onClick={handleSignUpClick} 
        style={{ color: 'blue', cursor: 'pointer' }}
      >
        Sign Up
      </span>
      {" "}!!
          </p>
        </Form.Item>
      </Form>
    </div>
    </div>)
}
export default AuthenticationComponet;