import React, { useState } from 'react';
import BookingType from './bookingType';
import SenderInformation from './senderInformation';
import ReceiverInformation from './receiverInformation';
import WeightInformation from './weightInformation';
import BookingSummary from './bookingSummary';
import ArticalImage from './articalimage';
import PaymentTransaction from './paymentTransaction';
import { Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const {  Content, Sider } = Layout;

function PercelComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  const goNextpage =(indexpage)=>{
    setCurrentStep(indexpage)
    window.scrollTo(0,0)
  }
  const steps = [
    'Booking Type',
    'Sender Information',
    'Receiver Information',
    'Weight Information',
    'Booking Summary',
    'Artical Image',
    'Payment Transaction',
  ];
  const content = [
    <BookingType goNextpage={goNextpage} />,
    <SenderInformation  goNextpage={goNextpage}/>,
    <ReceiverInformation goNextpage={goNextpage}/>,
    <WeightInformation goNextpage={goNextpage}/>,
    <BookingSummary goNextpage={goNextpage}/>,
    <ArticalImage goNextpage={goNextpage}/>,
    <div><PaymentTransaction/></div>
  ];
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  return (<>
  
  <Layout
          style={{
            padding: '24px 0',
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              // background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
    </>  );
}

export default PercelComponent;
