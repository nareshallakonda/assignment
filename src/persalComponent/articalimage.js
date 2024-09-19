import React ,{useState}from "react";
import { Form,Image,Upload, Button,Alert } from "antd";
import {  useSelector,connect } from 'react-redux';
import { percelLoggedData } from "../reducer";
import { useNavigate } from "react-router-dom";

const ArticalImage =(props)=>{
    const [imageSrc, setImageSrc] = useState(null);
    const { percelloggedData } = useSelector(state => state.auth);
    const [errormsg, seterrorMsg] = useState(null);
    const navigate = useNavigate();

  const handleCapture = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result); 
    };
    reader.readAsDataURL(file);
    return false;  // Prevent automatic upload
  };
  
  const goNext = async () => {
    if (imageSrc) {
      const updatedPercelLoggedData = {
        ...percelloggedData,
        image: imageSrc,
      };
      props.percelLoggedData(updatedPercelLoggedData);
    } 
    navigate("/layoutPercel/success");
  };
    return(<>
   <div className="artical-image">
    {errormsg && <Alert message="something went wrong please try again later !!" style={{color:'red'}}/>}
      <Upload
        accept="image/*"
        capture="camera"
        showUploadList={false}
        beforeUpload={handleCapture}
      >
        <Button className="capture-img">Capture Image</Button>
      </Upload>
      {!imageSrc && <div>
        <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=1024x1024&w=is&k=20&c=5aen6wD1rsiMZSaVeJ9BWM4GGh5LE_9h97haNpUQN5I=" 
         />
       </div>}
      {imageSrc && (
        <div style={{ marginTop: '20px' }}>
          <Image
            src={imageSrc || percelloggedData?.image}
            alt="Captured Image"
            width={300}
            height={200}
            style={{ borderRadius: '8px' }}
          />
        </div>
      )}

       <div  className="btn-right">
       <div className="d-flex">
       <Form.Item>
         <Button className="next-btn" htmlType="" onClick={()=>navigate("/layoutPercel/bookingsummary")}>Previous</Button> 
         </Form.Item>
        <Button className="next-btn" onClick={()=>goNext()}>Next</Button>
         </div>
        </div>
    </div>
    </>)
}
// export default ArticalImage;
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
export default connect(connectStateToProps, connectDispatchToProps)(ArticalImage);