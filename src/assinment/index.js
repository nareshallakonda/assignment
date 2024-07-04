import React, { useState } from "react";
import {Form,Input,DatePicker,Modal,Row,Col, Button,Tabs } from 'antd'
import Search from "antd/es/transfer/search";
const AssignMent =()=>{
    const [projectdetails,seProjectDetails]=useState([
        {projectName:"24015-237 WHC-Delaware Ranch, TX-46MW",createdDate:"2024-05-31",status:"Active"},
        {projectName:"24015-254 WHC-Green Mallard          ",createdDate:"2024-05-31",status:"Active"},
        {projectName:"24015.145_WHC-Hillsboro-1, TX-46MW",createdDate:"2024-05-31",status:"Active"},
        {projectName:"McCarthy Demo, TX-46MW",createdDate:"2024-05-31",status:"Active"}])
 
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [searchValue,setSearchValue]=useState('')
    const [soilLayers,setSoilLayer]=useState([{start:"",end:"",layer:""}]);

    const submitDetails=(values)=>{
        let obj = {projectName:values?.projectName,createdDate:values?.createdDate?.format('YYYY-MM-DD'),status:values?.status}
        seProjectDetails([...projectdetails,obj])
        setIsModalOpen(false)
    }
    const addSoilLayer = () => {
        setSoilLayer([...soilLayers, { start: '', end: '', layer: '' }]);
      };
    const removeSoilLayer=()=>{
        if(soilLayers.length >1){
            const newSoilLayer = soilLayers.slice(0,-1);
            setSoilLayer(newSoilLayer)
        }
    }
      const handleInputChange = (index, field, value) => {
        const newSoilLayers = [...soilLayers];
        newSoilLayers[index][field] = value;
        setSoilLayer(newSoilLayers);
      };
     const onSubmitLayers=()=>{
        const jsonOutput = JSON.stringify(soilLayers);
        console.log('Saved JSON:', jsonOutput);
     }
    const filteredData = projectdetails?.filter(item =>(item?.projectName)?.toLowerCase()?.includes(searchValue?.toLowerCase()));
    
    return(<>
    <h1>Assignment Test</h1>
    <h4 style={{marginLeft: "180px",}} onClick={()=>setIsModalOpen(!isModalOpen)}> + Create New</h4>
    <Col span={6} style={{marginLeft: "450px",}}> <Search placeholder="Enter projectname" onChange={(e)=>setSearchValue(e.target.value)}/></Col>
    <table border={"2px"} style={{marginLeft: "420px",marginTop:"10px",width:"50%"}}>
        <tr>
        <th>Project Name</th>
        <th>Created Date</th>
        <th>Status</th>
        </tr>
           {filteredData?.map((item)=>{
            return <tr>
            <td>{item?.projectName}</td>
            <td>{item?.createdDate}</td>
            <td>{item?.status}</td>
            </tr>
           }) }
    </table>
       <Modal  title="Add ProjectDetails"
       open={isModalOpen} footer={false} destroyOnClose={true} onCancel={()=>setIsModalOpen(!isModalOpen)}>
       <Form onFinish={submitDetails} autoComplete="off">
    <Row gutter={[24, 24]} className="modalPop-UP">
            <Col sm={18}>
                <Form.Item name="projectName" label="Project Name" 
                rules={[
                      {
                        required:true,
                        message: "Is required",
                        whitespace: true
                      }
                    ]}>
                    <Input placeholder="Project Name"/>
                </Form.Item>
                </Col>
                <Col sm={18} style={{width:'100%'}}>
                <Form.Item name="createdDate" label="Created Date " style={{width:'100%'}}  rules={[
                      {
                        required:true,
                        message: "Is required",
                      }
                    ]}>
                    <DatePicker format="DD/MM/YYYY" placeholder="Enter Date" style={{width:'100%'}}/>
                </Form.Item>
                </Col>
                <Col sm={18}>
                <Form.Item name="status" label='Status'  rules={[
                      {
                        required:true,
                        message: "Is required",
                        whitespace: true
                      }
                    ]}>
                    <Input placeholder="Status"/>
                </Form.Item>
                </Col>
            </Row>
             <div className="pupUp-Btn">
                <Button type="primary" className="pupUpBtn-submit" htmlType="submit">Submit</Button>
                <Button onClick={()=>setIsModalOpen(!isModalOpen)}>Cancel</Button>
                </div> 
            </Form>
        </Modal>
        <Tabs defaultActiveKey="1" style={{width:"80%",margin: "0px auto"}}>
        <Tabs.TabPane tab="P-Multiplier" key={"1"}>
         <Form onFinish={onSubmitLayers}>
         {soilLayers.map((layer, index) => (
            <Row key={index} gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={`P Multiplier Start (Layer ${index + 1})`}
                  rules={[{ required: true, message: 'Please input P Multiplier Start!' }]}
                >
                  <Input
                    type="number"
                    value={layer.start}
                    onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                    placeholder="Enter P Multiplier Start"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={`P Multiplier End (Layer ${index + 1})`}
                  rules={[{ required: true, message: 'Please input P Multiplier End!' }]}
                >
                  <Input
                    type="number"
                    value={layer.end}
                    onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                    placeholder="Enter P Multiplier End"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={`Soil Layer (Layer ${index + 1})`}
                  rules={[{ required: true, message: 'Please input Soil Layer!' }]}
                >
                  <Input
                    type="number"
                    minLength={1}
                    maxLength={6}
                    value={layer.layer}
                    onChange={(e) => handleInputChange(index, 'layer', e.target.value)}
                    placeholder="Enter Soil Layer"
                  />
                </Form.Item>
              </Col>
            </Row>
          ))}
          <Button type="dashed" onClick={addSoilLayer} style={{ width: '100%', marginBottom: '20px' }}>
            + Add Soil Layer
          </Button>
          <Button type="dashed" onClick={removeSoilLayer} style={{ width: '100%', marginBottom: '20px' }}>
            - Remove Soil Layer
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
         </Form>
        </Tabs.TabPane>
        </Tabs>
    </>)
}
export default AssignMent;