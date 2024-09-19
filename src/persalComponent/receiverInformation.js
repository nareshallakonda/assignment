import React,{ useState } from "react";
import { Button, Input,Form,Select,Row,Col,Alert } from "antd";
import { useSelector,connect } from 'react-redux';
import { percelLoggedData } from "../reducer";
import { useNavigate } from "react-router-dom";
const ReceiverInformation =(props)=>{
    const [errormsg, setErrorMsg]=useState(null);
    const {Option} = Select;
    const navigate = useNavigate();

    const { percelloggedData,userToken } = useSelector(state => state.auth);
    const receverInformationSave =(values) =>{
      const updatedPercelLoggedData = {
        ...percelloggedData,
        recerverInformation: values,
      };
      if(percelloggedData?.senderInformation?.email === values?.email){
        return setErrorMsg("Sender email and receiver email should not be the same")
      }
      props.percelLoggedData(updatedPercelLoggedData);
      navigate("/layoutPercel/weightinformation")
    }
    return (
      <>
        <div className="content-center">
          <div className="receiver-container">
          {errormsg && <Alert message={errormsg} style={{color:'red'}}/>}
            <Form
              className="Destination"
              name="register"
              layout="horizontal"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 18 }}
              initialValues={percelloggedData?.recerverInformation}
              onFinish={receverInformationSave}
            >
              <h2>Destination Info</h2>

              <Row>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="areaOfDestination"
                    label="Area of Destination"
                    rules={[{ required: true, message: "Please enter area!" }]}
                  >
                     <Input placeholder="Area of destination" type="text" />
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="pinCode"
                    label="PinCode"
                    rules={[
                      { required: true, message: "Please input your pinCode!" }
                    ]}
                  >
                    <Input placeholder="PinCode" maxLength={6} />
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="destinationState"
                    label="Destination State"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Destination State!"
                      }
                    ]}
                  >
                    <Input placeholder="Destination State" />
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="country"
                    label="Country/City"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Country/City!"
                      }
                    ]}
                  >
                    <Input placeholder="Country/City" />
                  </Form.Item>
                </Col>

                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Please input your phone Number!" }
                    ]}
                  >
                    <Input placeholder="phone Number" maxLength={10} />
                  </Form.Item>
                </Col>
               
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name!" }
                    ]}
                  >
                    <Input placeholder="Name" type="text" />
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input receiver email!" }
                    ]}
                  >
                    <Input placeholder="Email" type="email" />
                  </Form.Item>
                </Col>                
              </Row>

              <h3 className="heading-bg">ADDRESS</h3>
              <Row>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="address"
                    label="Delivary"
                    type="text"
                    rules={[
                      {
                        required: true,
                        message: "Please select delivery!"
                      }
                    ]}
                  >
                     <Select placeholder="Select Identity Type">
              <Option value="counterdelivery">Counter Delivery</Option>
              <Option value="doorDelivery">Door delivery</Option>
              </Select>
                    {/* <Input placeholder="Delivery" type="text" /> */}
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="flatNo"
                    label="FlatNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input flat no!"
                      }
                    ]}
                  >
                    <Input placeholder="FlatNo" maxLength={20} />
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="landmark"
                    label="Land mark"
                    rules={[
                      {
                        required: true,
                        message: "Please input land mark!"
                      }
                    ]}
                  >
                    <Input placeholder="land Mark" />
                  </Form.Item>
                </Col>
                <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
                  <Form.Item
                    name="townCity"
                    label="Town City"
                    rules={[
                      {
                        required: true,
                        message: "Please input your town city!"
                      }
                    ]}
                  >
                    <Input placeholder="Town City" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="btn-right">
                <div className="d-flex">
                  <Form.Item>
                    <Button
                      className="next-btn"
                      htmlType=""
                      onClick={() => navigate("/layoutPercel/senderinformation")}
                    >
                      Previous
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button className="next-btn" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </>
    );
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
export default connect(connectStateToProps, connectDispatchToProps)(ReceiverInformation);