import React, { useState } from 'react';
import {Alert,Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import SubpayMent from '../subpayment';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

const PaymentTransaction =(props)=>{
    const { percelloggedData,userConfig } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [errorMsg, seterrorMsg]=useState(null);

    const savePercelData = async (callback) => {
      const data = localStorage.getItem('userCofigData');
      const userConfigdata = data ? JSON.parse(data) : null;  
      const formData = new FormData();
      formData.append('userId', userConfig?._id || userConfigdata?._id);
      formData.append('bookingType', percelloggedData?.bookingType);
      formData.append('senderInformation', JSON.stringify(percelloggedData?.senderInformation)); // Convert objects to strings
      formData.append('receiverInformation', JSON.stringify(percelloggedData?.recerverInformation));
      formData.append('weightInformation', JSON.stringify(percelloggedData?.weightInformation));
      formData.append('bookingSummary', JSON.stringify(percelloggedData?.bookingSummary));
      const base64Response = await fetch(percelloggedData?.image);
      const blob = await base64Response.blob();
      formData.append('image', blob, 'image.png');
      try {
          const response = await axios.post(`https://backend-parcelbooking-6.onrender.com/api/createparcel`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Set proper content type
          },
        });
        
        if (response?.status === 201 || response?.status === 200) {
          callback(response);
          navigate("/layoutPercel/success");
        } else {
          // navigate("/layoutPercel/success");
          seterrorMsg(response?.data?.message);
        }
        seterrorMsg(response?.data?.message);
      } catch (error) {
        seterrorMsg(error?.response?.data?.message);
        console.error('Error creating parcel:', error);
      }
    };

    return (
      <>
        <div className="payment-transaction">
        {errorMsg && <Alert message="something went wrong please try again later !!" style={{color:'red'}}/>}
          <div className="summary-details">
            <h4>Sender Information</h4>
            <div className="d-flex summary-row">
              <p>
                Area of Destnation :{" "}
                {percelloggedData?.senderInformation?.areaOfDestination}
              </p>
              <p>
                Phone Numbe : {percelloggedData?.senderInformation?.phoneNumber}
              </p>
              <p>
                Source State :{" "}
                {percelloggedData?.senderInformation?.sourceState}
              </p>
              <p>Name : {percelloggedData?.senderInformation?.name}</p>
              <p>
                Pickup Date : {percelloggedData?.senderInformation?.pickupDate
                ? moment(percelloggedData.senderInformation.pickupDate)?.format('MM/DD/YYYY')
                : 'Not available'}
              </p>
              <p>Address : {percelloggedData?.senderInformation?.address}</p>
              <p>Land Mark : {percelloggedData?.senderInformation?.landmark}</p>
              <p>
                Identity Number:
                {percelloggedData?.senderInformation?.identityNumber}
              </p>
            </div>
            <h4>Receiver Information</h4>
            <div className="d-flex summary-row">
              <p>
                Area of Destnation :{" "}
                {percelloggedData?.recerverInformation?.areaOfDestination}
              </p>
              <p>
                Destination State :{" "}
                {percelloggedData?.recerverInformation?.destinationState}
              </p>
              <p>
                Country/City : {percelloggedData?.recerverInformation?.country}
              </p>
              <p>Name : {percelloggedData?.recerverInformation?.name}</p>
              <p>
                Phone Number :{" "}
                {percelloggedData?.recerverInformation?.phoneNumber}
              </p>
              <p>Delivary : {percelloggedData?.recerverInformation?.address}</p>
              <p>
                Land Mark : {percelloggedData?.recerverInformation?.landmark}
              </p>
              <p>FlatNo:{percelloggedData?.recerverInformation?.flatNo}</p>
            </div>
            <h4>Weight Information</h4>
            {percelloggedData?.weightInformation &&
            Array.isArray(percelloggedData.weightInformation) &&
            percelloggedData.weightInformation.length > 0 ? (
              percelloggedData.weightInformation.map((item, index) => (
                <div key={index} className="d-flex summary-row">
                  <p>Weight Calculation : {item?.weightCalculation}</p>
                  <p>Product : {item?.product}</p>
                  <p>Sub Category : {item?.subCategory}</p>
                  <p>Type of piece : {item?.typeOfPieces}</p>
                  <p>Actual Weight : {item?.actualWeight}</p>
                  <p>No.of pieces : {item?.noOfPieces}</p>
                  <p>Total Weight : {item?.amountOfKg}</p>
                  <p></p>
                </div>
              ))
            ) : (
              <p>No weight information available.</p>
            )}
          </div>
          <div className="payment-btn">
            <SubpayMent  savePercelData={savePercelData} totalPaymentAmount={percelloggedData?.totalPaymentAmount}/>
          </div>
        </div>
      </>
    );
}
export default PaymentTransaction;