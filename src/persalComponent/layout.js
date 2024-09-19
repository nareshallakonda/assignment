import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileProtectOutlined,
  DollarOutlined,
  PictureOutlined,
  FileDoneOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Content, Sider } = Layout;

const LayoutPercel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [isIndexPosition, setIndexPosition] = useState(0);
  const { screenIndexPosition } = useSelector(state => state.auth);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const pathIndexMap = {
      '/layoutPercel/bookingtype': 0,
      '/layoutPercel/senderinformation': 1,
      '/layoutPercel/receiverinformation': 2,
      '/layoutPercel/weightinformation': 3,
      '/layoutPercel/bookingsummary': 4,
      '/layoutPercel/articalimage': 5,
      '/layoutPercel/success': 6,
    };

    setIndexPosition(pathIndexMap[pathname] || 0);
  }, [pathname,screenIndexPosition]);

  function getItem(label, key, icon, path) {
    const isDisabled = Number(key) > isIndexPosition;
    return {
      key,
      icon: isIndexPosition > Number(key) ? '✔️' : icon,//Number(key) <= isIndexPosition ? '✔️' : icon, // Show checkmark for completed steps
      label: <Link to={`/layoutPercel/${path}`}>{label}</Link>,  // Use Link for navigation
      disabled: isDisabled,
    };
  }

  // Define menu items with correct paths and icons
  const items = [
    getItem('Booking Type', '0', <FileProtectOutlined />, 'bookingtype'),
    getItem('Sender Information', '1', <SolutionOutlined />, 'senderinformation'),
    getItem('Receiver Information', '2', <SolutionOutlined />, 'receiverinformation'),
    getItem('Weight Information', '3', <DesktopOutlined />, 'weightinformation'),
    getItem('Booking Summary', '4', <FileDoneOutlined />, 'bookingsummary'),
    getItem('Artical Image', '5', <PictureOutlined />, 'articalimage'),
    getItem('Payment Transaction', '6', <DollarOutlined />, 'success'),
  ];

  const breadcrumbNameMap = {
    '/layoutPercel/bookingtype': 'Booking Type',
    '/layoutPercel/senderinformation': 'Sender Information',
    '/layoutPercel/receiverinformation': 'Receiver Information',
    '/layoutPercel/weightinformation': 'Weight Information',
    '/layoutPercel/bookingsummary': 'Booking Summary',
    '/layoutPercel/articalimage': 'Artical Image',
    '/layoutPercel/success': 'Payment Transaction',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["0"]}
            selectedKeys={[String(isIndexPosition)]}
            items={items}
            className='activesec'
          />
        </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '0px 0', fontSize:'large', fontWeight:'bold' }}>
            <Breadcrumb.Item>Booking</Breadcrumb.Item>
            {breadcrumbNameMap[pathname]}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MAKBIL ONLINE SOLUTIONS PRIVATE LIMITED</p>
    </footer>
      </Layout>
    </Layout>
  );
};

export default LayoutPercel;
