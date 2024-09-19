import React, { useState } from "react";
import { Form,Col,Row,Input, Button,Checkbox } from "antd";
import { useSelector,connect } from 'react-redux';
import { percelLoggedData } from "../reducer";
import { useNavigate } from "react-router-dom";

const BookingSummary=(props)=>{
  const { percelloggedData } = useSelector(state => state.auth);
  const [showSummariDetails,setShowSummaryDetails]=useState(percelloggedData?.bookingSummary ? true : false);
  const navigate = useNavigate();
  const calculateWeight = percelloggedData?.weightInformation?.reduce((accum, curr) => {
    const amountOfKg = parseFloat(curr.amountOfKg) || 0;
    return accum + amountOfKg;
  }, 0);
  
  const noOfPieces = percelloggedData?.weightInformation?.reduce((accum, curr) => {
    const noOfPieces = parseFloat(curr.noOfPieces) || 0;
    return accum + noOfPieces;
  }, 0);
 
  const netChargePerKg = 200; // Net charge per kilogram
  const doorPickUpChargePercentage = 0.01; // 1%
  const packageChargePercentage = 0.02; // 2%
  
  // Calculate total net charges
  const totalNetCharges = calculateWeight * netChargePerKg;
  
  // Calculate door pick-up charges as 1% of total net charges
  const doorPickUpCharges = totalNetCharges * doorPickUpChargePercentage;
  
  // Calculate package charges as 2% of total net charges
  const packageCharges = totalNetCharges * packageChargePercentage;

  const saveSummaryDetails=(values)=>{
    setShowSummaryDetails(true);
    const updatedPercelLoggedData = {
      ...percelloggedData,
      bookingSummary: values,
      totalPaymentAmount:totalNetCharges + doorPickUpCharges + packageCharges
    };
    props.percelLoggedData(updatedPercelLoggedData);
    navigate("/layoutPercel/articalimage")
  }
    return (
      <>
        <div className="booking-summary">
          <Form layout="vertical" onFinish={saveSummaryDetails} initialValues={percelloggedData?.bookingSummary}>
            <Row>
              <Col span={24}>
                <h3 className="section-title">BOOKING</h3>
              </Col>
              <Col
                xl={8}
                xs={24}
                xxl={6}
                lg={12}
                sm={24}
                style={{ marginRight: "16px" }}
              >
                <Form.Item
                  name="shipmentValue"
                  label="Shipment Value"
                  rules={[
                    {
                      required: true,
                      message: "Please input your shipment value!"
                    }
                  ]}
                >
                  <Input placeholder="Enter shipment value" />
                </Form.Item>
              </Col>
              <Col xl={8} xs={24} xxl={6} lg={12} sm={24}>
                <Form.Item
                  name="packingDescription"
                  label="Packing Description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your packing description!"
                    }
                  ]}
                >
                  <Input placeholder="Enter packing description" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <h3 className="section-title">Choose Packing</h3>
              </Col>
              <Col xl={8} xs={24} xxl={6} lg={12} sm={24}>
                <Form.Item name="coverPacking" valuePropName="checked">
                  <Checkbox>Cover Packaging</Checkbox>
                </Form.Item>
              </Col>
              <Col xl={8} xs={24} xxl={6} lg={12} sm={24}>
                <Form.Item
                  name="plasticewrapperpacking"
                  valuePropName="checked"
                >
                  <Checkbox>Plastic Wrapper Packaging</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col span={24}>
                <div className="d-flex align-items-center">
                  <p>Original Documents, Cash, Gold not allowed for booking</p>
                  <Form.Item
                    name="originalDocuments"
                    valuePropName="checked"
                    className="checkbox-item"
                    rules={[
                      {
                        required: true,
                        message: "required"
                      }
                    ]}
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <div className="d-flex align-items-center">
                  <p>Accept Terms and Conditions</p>
                  <Form.Item
                    name="termsandCondition"
                    valuePropName="checked"
                    className="checkbox-item"
                    rules={[
                      {
                        required: true,
                        message: "required"
                      }
                    ]}
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            {showSummariDetails && <div className="summary-details">
          <p style={{ fontSize: "15px", fontWeight: "bold", margin: "20px 0" }}>
            Fare Details
          </p>
          {/* totalNetCharges,doorPickUpCharges,packageCharges */}
          <div className="d-flex summary-row">
            <p>Calculate Weight: {calculateWeight}</p>
            <p>Total No. of Pieces: {noOfPieces}</p>
            <p>Net Charges: {totalNetCharges}</p>
            <p>Door PickUp Charges: {doorPickUpCharges}</p>
          </div>
          <div className="d-flex summary-row">
            <p>Package Charges : {packageCharges}</p>
          </div> 
          <p
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              margin: "20px 0",
              color: "blue"
            }}
          >
            Total Bill Amount: {totalNetCharges + doorPickUpCharges + packageCharges}
          </p>
          <div className="btn-right" style={{ marginTop: 10 }}>
            <div className="d-flex">
              
              <Form.Item>
                <Button
                  className="next-btn "
                  htmlType=""
                  onClick={() => navigate("/layoutPercel/weightinformation")}
                >
                  Previous
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className="next-btn mr-15"
                  htmlType="submit"
                >
                  Next
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>}
          </Form>
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
export default connect(connectStateToProps, connectDispatchToProps)(BookingSummary);