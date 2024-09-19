import { Row,Col,Select,Form,Input,DatePicker,Button } from "antd";
import React from "react";
import { useSelector,connect } from 'react-redux';
import { percelLoggedData } from "../reducer";
import { useNavigate } from "react-router-dom";
import fieldValidationRules from "../validater";
import moment from 'moment';

const SenderInformation =(props)=>{
    const { Option } = Select;
    const {TextArea}=Input;
    const { percelloggedData } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const senderInformationSave =(values)=>{
      const updatedPercelLoggedData = {
        ...percelloggedData,
        senderInformation: values,
      };
      props.percelLoggedData(updatedPercelLoggedData);
      // props.goNextpage(2)
      navigate("/layoutPercel/receiverinformation")
      // onClick={()=>props.goNextpage(2)}
    }

    const disablePastDates = (current) => {
      // Disable past dates (dates before today)
      return current && current < moment().startOf('day');
    };
  
    return(<>
    <div className="sender-container">
      <Row style={{margin:9}}>
        <Col xl={16} xs={24} xxl={16} lg={18} sm={24}>
          <div className="left-content">
            <p style={{fontSize:20,fontFamily:"bold",marginTop:16}}>Source Info</p>
          </div>
        </Col>
        <Col xl={8} xs={24} xxl={8} lg={6} sm={24} className="right-aligned">
          <div className="right-content">
            <p className="btn-right" style={{fontSize:20,fontFamily:"bold",marginTop:16}}>AVAILABLE ACTIVE COUNTERS</p>
          </div>
        </Col>
      </Row>
      <hr/>
     <Form onFinish={senderInformationSave} initialValues={percelloggedData.senderInformation}>
      <Row gutter={16} className="active-counters">
      <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="areaOfDestination"
            label="Area of Destnation"
            rules={[{ required: true, message: "Please Select Destination!" }]}
          >
            <Select placeholder="Select Destination">
              <Option value="BanjaraHills">Banjara Hills</Option>
              <Option value="JubileeHills">Jubilee Hills</Option>
              <Option value="Begumpet">Begumpet</Option>
              <Option value="Gachibowli">Gachibowli</Option>
              <Option value="Madhapur">Madhapur</Option>
              <Option value="Secunderabad">Secunderabad</Option>
              <Option value="Kukatpally">Kukatpally</Option>
              <Option value="Warangal">Warangal</Option>
              <Option value="Nizamabad">Nizamabad</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xl={6} xs={24} xxl={6} lg={12} sm={24} className="d-block">
          <Form.Item
            name="pinCode"
            label="PinCode"
            rules={[{ required: true, message: "Please enter a valid pinCode!",validator: fieldValidationRules('pinCode') }]}
          >
            <Input placeholder="PinCode" type="text" maxLength={6} />
          </Form.Item>
        </Col>

        <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input placeholder="Phone Number"  maxLength={10}/>
          </Form.Item>
        </Col>

        <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="sourceState"
            label="Source State"
            rules={[{ required: true, message: "Please enter State!" }]}
          >
            <Input placeholder="Source State" />
          </Form.Item>
        </Col>
        <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>

        <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="pickupCounter"
            label="Pickup Counter"
            rules={[{ required: true, message: "Please input your Pickup Counter!" }]}
          >
            <Input placeholder="Pickup Counter" />
          </Form.Item>
        </Col>

        <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
        </Col>

        <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="pickupDate"
            label="Pickup Date"
            rules={[{ required: true, message: "Please select your Pickup Date!" }]}
          >
            <DatePicker placeholder="Pickup Date" style={{ width: '100%' }} disabledDate={disablePastDates} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <h3 className="heading-bg" >ADDRESS</h3>
        <Col xl={24} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <TextArea placeholder="Address" rows={4} />
          </Form.Item>
        </Col>
        <Col xl={8} xs={24} xxl={6} lg={12} sm={24} >
          <Form.Item
            name="landmark"
            label="Landmark"
            rules={[{ required: true, message: "Please input your Landmark!" }]}
          >
            <Input placeholder="Landmark" />
          </Form.Item>
        </Col>
        <Col xl={8} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="townCity"
            label="Town/City"
            rules={[{ required: true, message: "Please input your Town/City!" }]}
          >
            <Input placeholder="Town/City" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <h3  className="heading-bg">IDENTITY</h3>
        <Col xl={24} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="identityType"
            label="Identity Type"
            rules={[{ required: true, message: "Please Select Identity Type!" }]}
          >
            <Select placeholder="Select Identity Type">
              <Option value="aadhaar">Aadhaar Card</Option>
              <Option value="passport">Passport</Option>
              <Option value="passport">Driving License</Option>
              <Option value="passport">pan Card</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xl={8} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="identityNumber"
            label="Identity Number"
            rules={[{ required: true, message: "Please input your Identity Number!" }]}
          >
            <Input placeholder="Identity Number" />
          </Form.Item>
        </Col>
      </Row>
      <div  className="btn-right bt-mr-10">
      <div className="d-flex">
         <Form.Item>
         <Button className="next-btn" htmlType="" onClick={()=>navigate("/layoutPercel/bookingtype")}>Previous</Button> 
         </Form.Item>
         <Form.Item>
        <Button className="next-btn" htmlType="submit" >Next</Button>
        </Form.Item>
         </div>
        </div>
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

  }
}
export default connect(connectStateToProps, connectDispatchToProps)(SenderInformation);
