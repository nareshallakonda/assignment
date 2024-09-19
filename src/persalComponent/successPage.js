import React from "react";
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const Successpage =()=>{
    const navigate = useNavigate();
    const logintoApp=()=>{
        navigate('/dashboard')
      }
    return(<>
    <div className="">
        <div className="success-page">
      <CheckCircleOutlined className="success-icon" />
      <h1>Success!</h1>
      <p>Your transaction was completed successfully.</p>
      <Button type="primary" onClick={()=>logintoApp()}>Go to Dashboard</Button>
    </div></div>
    </>)
}
export default Successpage;