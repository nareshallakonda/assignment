import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import './dashboard.css'; 
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const navigate = useNavigate();
        const { userToken } = useSelector(state => state.auth);

    return (
        <>
            <div className="dashboard-container">
                <div className="image-container">
                        <h2>STARTING AN E-COMMERCE STORE? LET US LOOK AFTER YOUR LOGISTICS</h2>
                        <span>Sell, ship, and track with ease by choosing multiple courier partners through one single shipping platform</span>
                    {!userToken && (
                        <Button className="go-booking" onClick={() => navigate('/rigister')}>
                            Register
                        </Button>
                    )}
                </div>              
            </div>
        </>
    );
}

export default Dashboard;


