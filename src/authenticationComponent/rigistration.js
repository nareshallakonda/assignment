import React, { useState } from "react";
import { Button, Input,Form, Radio,Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration =()=>{
    const {TextArea}=Input
    const navigate = useNavigate();
    const [error,setError]=useState(null);
    const [btnLoading,setBtnLoading]=useState(false);
    const onFinish = async (values) => {
      setBtnLoading(true);
      try {
          let obj = {
            fullName: values?.fullName,
            email: values?.email,
            phoneNumber: values?.phoneNumber,
            pincode: values?.pincode,
            gender: values?.gender,
            password: values?.password,
            address: values?.address
          };
        const response = await axios.post(`https://backend-parcelbooking-6.onrender.com/api/signup`, obj);
        if(response?.status === 201){
          navigate("/login"); 
          setBtnLoading(false);
        }else{
          setError(response?.data?.message);
          setBtnLoading(false);
        }
      } catch (error) {
        setError(error?.response?.data?.message)
        setBtnLoading(false);
      }
    };
    
    
      const onFinishFailed = (errorInfo) => {
      }; 

      const handleSignUpClick = () => {
        navigate("/login");
      };
    return(<div className="content-center">
     <div className="login-container">
     {error &&<Alert message={error} style={{color:'red',textAlign:'center'}}/>}
      <Form
        name="register"
        layout="horizontal"  // Horizontal layout for label and input alignment
        labelCol={{ span: 8 }} // Label width
        wrapperCol={{ span: 14 }} // Input width
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2>Register</h2>

        <Form.Item
          name="fullName"
          label="User Name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input a valid password!" }]}
        >
          <Input.Password placeholder="Password" maxLength={10}/>
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          type ="text"
          rules={[{ required: true, message: "Please input your phone number!" }]}
        >
          <Input placeholder="Phone Number" type="text" maxLength={10} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="others">Others</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="pincode"
          label="PinCode"
          rules={[{ required: true, message: "Please input your pinCode!" }]}
        >
          <Input placeholder="PinCode"  type="number" maxLength={6}/>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <TextArea placeholder="Address" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit" block loading={btnLoading}>
            Register
          </Button>

          <p style={{ marginTop: 5 }}>
          Already have an account? {" "}
      <span 
        onClick={handleSignUpClick} 
        style={{ color: 'blue', cursor: 'pointer' }}
      >
        Login
      </span>
      {" "}!!
          </p>
        </Form.Item>
      </Form>
    </div>
    </div>)
}
export default Registration;