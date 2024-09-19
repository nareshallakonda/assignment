import React, { useState } from "react";
import { Button, Form,  Select,Row,Col } from "antd";
import {  useSelector,connect } from 'react-redux';
import { percelLoggedData,screenIndexPosition } from "../reducer";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const BookingType =(props)=>{
  const { percelloggedData } = useSelector(state => state.auth);
  const [bookingData, setBookingData] = useState({
    bookingType: percelloggedData?.bookingType || null
  });
     const [bookingValue,selectValue]=useState(null)
     const navigate = useNavigate();
     const bookingSave=(values)=>{
        setBookingData(values);
        const updatedPercelLoggedData = {
            ...percelloggedData,
            bookingType: values?.bookingType,
          };
          props.screenIndexPosition(1)
          props.percelLoggedData(updatedPercelLoggedData);
          navigate("/layoutPercel/senderinformation");
     }
    return(<>
    <div className="booking-type">
    <Form initialValues={bookingData} onFinish={bookingSave}>
        <Row>
        <Col xl={8} xs={24} xxl={8} lg={12} sm={24} ></Col>
        <Col xl={8} xs={24} xxl={8} lg={12} sm={24} >
         <Form.Item
          name="bookingType"
          label="Booking"
          rules={[{ required: true, message: "Please Select booking!" }]}>
          <Select placeholder="Select Booking Type" onChange={(e)=>selectValue(e)}>
          <Option value="percel">Percel</Option>
          <Option value="envelop">Envelop</Option>
        </Select>
        </Form.Item>
        <div  className="btn-right">
        <Form.Item>
        <Button className="next-btn" htmlType="submit" >Next</Button>
        </Form.Item>
        </div>
        </Col>
        </Row>
        {/* {bookingValue == "percel" && <p style={{color:'black',textAlign:'center',fontWeight:'bold'}}>Parcel should be allowed from 1kg to 50kg </p>}
        {bookingValue == "envelop" && <p style={{color:'black',textAlign:'center',fontWeight:'bold'}}>Envelope should be allowed up to 1kg </p>} */}
    </Form>
    </div>  
    </>)
}

const connectStateToProps = ({  }) => {
    return {  }
  }
  const connectDispatchToProps = dispatch => {
    return {
        percelLoggedData: (wallet) => {
            dispatch(percelLoggedData(wallet))
        },
        screenIndexPosition: (indexPosition) => {
          dispatch(screenIndexPosition(indexPosition))
      },
  
    }
  }
  export default connect(connectStateToProps, connectDispatchToProps)(BookingType);