import React, { useState } from "react";
import { Button, Input,Form, Select,Row,Col } from "antd";
import {  useSelector,connect } from 'react-redux';
import { percelLoggedData } from "../reducer";
import { useNavigate } from "react-router-dom";

const WeightInformation =(props)=>{
    const {Option} = Select;
    const { percelloggedData } = useSelector(state => state.auth);
    const [weightInformation,setWeightInformation] = useState(percelloggedData?.weightInformation || [])
    const [form] = Form.useForm();
    const [amountOFKG,setAmountOfKGS]=useState(null);
    const [calculateKg,setCalculateKG] = useState({"actualweight":null,"noOfPieces":null});
    const navigate = useNavigate();
    const weightInformationSave=(values)=>{
      setWeightInformation(prevState => {
        if (Array.isArray(prevState)) {
          return [...prevState, values];
        } else {
          return [values];
        }
      });

      form.resetFields();
    }
    const calculateAmountofKg = (key, e) => {
      // Get the input value
      const value = parseFloat(e?.target?.value) || 0;
      
      // Update the state based on the field key
      setCalculateKG(prev => ({
        ...prev,
        [key]: value
      }));
      
      // Calculate the amount of kg based on the updated state
      const { actualweight, noOfPieces } = calculateKg;
      const calculateAmount = key === "actualweight" 
        ? value * noOfPieces 
        : actualweight * value;
      
      // Update the amount of kg state and form value
      setAmountOfKGS(calculateAmount);
      form.setFieldsValue({ amountOfKg: calculateAmount });
    };
    
    const goNextpage =()=>{
      const updatedPercelLoggedData = {
        ...percelloggedData,
        weightInformation: weightInformation,
      };
      props.percelLoggedData(updatedPercelLoggedData);
      navigate("/layoutPercel/bookingsummary");
    }
    return (
      <>
        <h3 className="heading-bg">
          WEIGHT INFO (Please CLICL ON ADD BUTTON TO CALCULATE WEIGHT AND
          TRANSPORT CHARGES)
        </h3>
        <Form 
        onFinish={weightInformationSave} 
        form={form}
        >
        <Row gutter={16}>
          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
            <Form.Item
              name="weightCalculation"
              label="Weight Calculation"
              rules={[{ required: true, message: "Please select weightCalculation!" }]}
            >
              <Select placeholder="Select Weight Calculation">
              <Option value="General">GENERAL</Option>
              <Option value="volumetric_inside_dick">Volumetric_Inside_Dick</Option>
              <Option value="volumetric_roof_top">Volumetric_Roof_Top</Option>
              </Select>
              {/* <Input type="text" placeholder="Weight Calculation"/> */}
            </Form.Item>
          </Col>
          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
            <Form.Item
              name="product"
              label="Product"
              rules={[{ required: true, message: "Please select product!" }]}
            >
               <Select placeholder="Select product">
              <Option value="coconut bags">Coconut Bags</Option>
              <Option value="General">General</Option>
              <Option value="Mangoes">Mangoes</Option>
              <Option value="perishables">Perishables</Option>
              <Option value="steel/plastic">Steel / plastic</Option>
              </Select>
              {/* <Input type="text" placeholder="product"/> */}
            </Form.Item>
          </Col>
          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
            <Form.Item
              name="subCategory"
              label="Sub Category"
              type="number"
              rules={[
                { required: true, message: "Please select subCategory!" }
              ]}
            >
              <Select placeholder="Select subCategory">
              <Option value="agri product">Agri Product</Option>
              <Option value="aluminium">Aluminium</Option>
              <Option value="Aqua Products">Aqua products</Option>
              <Option value="banners">Banners</Option>
              <Option value="Blood Samples">Blood Samples</Option>
              <Option value="books">books</Option>
              <Option value="Chilli Powder">Chilli Powder</Option>
              <Option value="coconut">Coconut</Option>
              <Option value="courier">Courier</Option>
              <Option value="dental">Dental</Option>
              <Option value="medical">Medical</Option>
              </Select>
              {/* <Input placeholder="Sub Category" type="number" /> */}
            </Form.Item>
          </Col>

          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
            <Form.Item
              name="typeOfPieces"
              label="Type of piece"
              rules={[{ required: true, message: "Please select Type of piece!" }]}
            >
               <Select placeholder="Select type of pieces">
              <Option value="box">Box</Option>
              <Option value="nos">NOS</Option>
              </Select>
              {/* <Input type="text" placeholder="type Of Piece"/> */}
            </Form.Item>
          </Col>
          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
            <Form.Item
              name="actualWeight"
              label="Actual Weight"
              rules={[{ required: true, message: "Please input actual weight!" }]}
            >
              <Input placeholder="Actual Weight" type="number" onChange={(e)=>calculateAmountofKg("actualweight",e)}/>
            </Form.Item>
          </Col>
          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
            <Form.Item
              name="noOfPieces"
              label="No.of pieces"
              rules={[{ required: true, message: "Please input no of pieces!" }]}
            >
              <Input placeholder="No. Of Pieces" onChange={(e)=>calculateAmountofKg("noOfPieces",e)} />
            </Form.Item>
          </Col>
          <Col xl={6} xs={24} xxl={6} lg={12} sm={24}>
          <Form.Item
            name="amountOfKg"
            label="Total Weight"
            // rules={[{ required: true, message: "Please input the total weight!" }]}
          >
            <Input placeholder="Total weight"  
            value={amountOFKG}
            type="number"
            suffix={"KG"}
            disabled
            style={{
                  color: "#000", // Ensure text color is dark
                  opacity: 1, // Override opacity for disabled field
                  backgroundColor: "#f5f5f5", // Slightly different background to enhance readability
                  fontSize:20
                }}/>
          </Form.Item>
        </Col>       
        </Row>
        <div className="weight-btn-right">
            <Form.Item >
              <Button type="primary" htmlType="submit" block>
                Add +
              </Button>
            </Form.Item>
          </div>
        </Form>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Weight Calculation</th>
              <th>Product</th>
              <th>Sub Category</th>
              <th>Type of Pieces</th>
              <th>Actual Weight</th>
              <th>No. of Pieces</th>
              <th>Total Weight</th>
            </tr>
          </thead>
          <tbody>
            {weightInformation?.map(item=>{
              return <tr>
              <td>{item.weightCalculation}</td>
              <td>{item.product}</td>
              <td>{item.subCategory}</td>
              <td>{item.typeOfPieces}</td>
              <td>{item.actualWeight}</td>
              <td>{item.noOfPieces}</td>
              <td>{item.amountOfKg}</td>
            </tr>
            })}
           <tr>
           <td colSpan="8">
            {weightInformation?.length === 0 && <>
             <div className="nodata-found">
             <div>No data found</div>
             </div>
            </>}
            </td>
           </tr>
          </tbody>
        </table>
        <div className="btn-right bt-mr-10">
          <div className="d-flex">
          <Form.Item>
         <Button className="next-btn" htmlType="" onClick={() => navigate("/layoutPercel/receiverinformation")}>Previous</Button> 
         </Form.Item>
          <Form.Item>
            <Button className="next-btn" onClick={() => goNextpage()}>
              Next
            </Button>
          </Form.Item>
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
export default connect(connectStateToProps, connectDispatchToProps)(WeightInformation);