import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthenticationComponent from "../authenticationComponent";
import { Spin } from "antd";
import Registration from "../authenticationComponent/rigistration";
import PercelComponent from "../persalComponent";
import BookingType from "../persalComponent/bookingType";
import BookingSummary from "../persalComponent/bookingSummary";
import ReceiverInformation from "../persalComponent/receiverInformation";
import SenderInformation from "../persalComponent/senderInformation";
import WeightInformation from "../persalComponent/weightInformation";
import Dashboard from "../persalComponent/dashboard";
import LayoutPercel from "../persalComponent/layout";
import Articalimage from "../persalComponent/articalimage";
import PaymentTransaction from "../persalComponent/paymentTransaction";
import { useSelector } from 'react-redux';
import MyBooking from "../../src/myBooking/myBooking";

const ContentRoute = () => {
  const { userToken } = useSelector(state => state.auth);
  const data = localStorage.getItem('userCofigData');
  return (
    <>
      <Suspense
        fallback={
          <div className="loader">
            <Spin size="large" tip="Loading..." />
          </div>
        }
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<AuthenticationComponent />} />
          <Route path="/rigister" element={<Registration />} />
          <Route path="/layoutPercel" element={<LayoutPercel />}>
          <Route path="bookingtype" element={<BookingType />} />
          <Route path="bookingsummary" element={<BookingSummary />} />
          <Route path="articalimage" element={<Articalimage />} />
          <Route path="receiverinformation" element={<ReceiverInformation />} />
          <Route path="senderinformation" element={<SenderInformation />} />
          <Route path="weightinformation" element={<WeightInformation />} />
          <Route path="booking" element={<PercelComponent />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="success" element={<PaymentTransaction />} />
        </Route>
          <Route path="/myboking" element={<MyBooking />} /> 
        </Routes>
      </Suspense>
    </>
  );
};

export default ContentRoute;
