import React, { useState, useEffect } from "react";
import './myBooking.css';
import { FaShoppingCart, FaTruck, FaBicycle, FaHome, FaCheckCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

const MyBooking = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [orderStatus, setOrderStatus] = useState('out_for_delivery'); // Initial status for the modal
    const [parcels, setParcels] = useState([]); // State to store parcels fetched from the API
    const [error, setError] = useState(null); // Error state
    const { userConfig } = useSelector(state => state.auth);
    const data = localStorage.getItem('userCofigData');
    const userConfigdata = data ? JSON.parse(data) : null;
    const [loading, setLoading] = useState(false);
    // Fetch parcels from the API
    useEffect(() => {
        const fetchParcels = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://backend-parcelbooking-6.onrender.com/api/parcels/${userConfig?._id || userConfigdata?._id}`); // API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch parcels');
                    setLoading(false)
                }
                const data = await response.json();
                setParcels(data); // Set the fetched data to the parcels state
            } catch (err) {
                setLoading(false);
                setError(err.message); // Set error if the request fails
            }
        };

        fetchParcels(); // Call the function to fetch parcels
    }, []); // Empty dependency array ensures the API call is made only once when the component mounts

    const openModal = (parcel) => {
        setSelectedParcel(parcel); // Save the selected parcel details
        setOrderStatus('order_placed'); // Set initial status for tracking
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
        setSelectedParcel(null); // Clear selected parcel
    };

    const getIconColor = (status) => {
        switch (status) {
            case 'order_placed':
                return 'black';
            case 'shipped':
                return 'black';
            case 'out_for_delivery':
                return 'black';
            case 'delivered':
                return 'black';
            default:
                return '#E0E0E0';
        }
    };

    return (
      <>
        {parcels?.length === 0 && (
          <div className="nodata-container">
            {!loading && <div className="nodata-found-booking">No data Found</div>}
            {loading && <div class="loading-container">
            <span class="loading-text">loading...</span>
            </div>}
          </div>
        )}
        <div className="parcel-container">
          {parcels?.map((parcel, index) => (
            <div key={index} className="parcel-card">
              <div className="info-container">
                <div className="sender-info">
                  <h4>Parcel {index + 1} - Sender Information</h4>
                  <p>
                    <strong>Name:</strong> {parcel.senderInformation?.name}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {parcel.senderInformation?.phoneNumber}
                  </p>
                  <p>
                    <strong>State:</strong>{" "}
                    {parcel.senderInformation?.sourceState}
                  </p>
                  <p>
                    <strong>Pin Code:</strong>{" "}
                    {parcel.senderInformation?.pinCode}
                  </p>
                </div>

                <div className="receiver-info">
                  <h4>Receiver Information</h4>
                  <p>
                    <strong>Name:</strong> {parcel.receiverInformation?.name}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {parcel.receiverInformation?.phoneNumber}
                  </p>
                  <p>
                    <strong>State:</strong>{" "}
                    {parcel.receiverInformation?.destinationState}
                  </p>
                  <p>
                    <strong>Pin Code:</strong>{" "}
                    {parcel.receiverInformation?.pinCode}
                  </p>
                </div>

                {/* <div className="weight-info">
                            <h4>Weight Information</h4>
                            <p><strong>Product:</strong> {parcel.weightInformation?.product}</p>
                            <p><strong>Sub-Category:</strong> {parcel.weightInformation?.subCategory}</p>
                            <p><strong>Actual Weight:</strong> {parcel.weightInformation?.actualWeight}</p>
                            <p><strong>Number of Pieces:</strong> {parcel.weightInformation?.noofpicess}</p>
                        </div> */}
              </div>

              <button
                className="status-button"
                onClick={() => openModal(parcel)}
              >
                Check Order Status
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <FontAwesomeIcon
                icon={faTimes}
                className="modal-close-icon"
                onClick={closeModal}
              />
              <h2>
                Order Status for {selectedParcel?.senderInformation?.name}'s
                Parcel
              </h2>
              <div className="trackOrderinformationContainer">
                <div className="shoeImage">
                  <img
                    // src={selectedParcel?.image}
                    src={`https://backend-parcelbooking-6.onrender.com${selectedParcel?.image}`} // Ensure the full URL is used
                    alt="Shoe"
                    className="trackOrdershoeImageStyle"
                  />
                </div>
                <div className="trackOrderdetails">
                  <div className="shoeNameAndPrice">
                    <span className="shoeName">
                      ProductName:{" "}
                      {selectedParcel?.weightInformation[0]?.product}
                    </span>
                  </div>
                  {/* <div className="colorAndSize">
                                    <span className="colorText">Actual Weight: {selectedParcel?.weightInformation?.actualWeight}</span>
                                </div> */}
                  {/* <span className="price">Number of Pieces: {selectedParcel?.weightInformation?.noofpicess}</span> */}
                </div>
              </div>
              <div className="orderJourneyContainer">
                <button
                  onClick={() => setOrderStatus("order_placed")}
                  className="icon-button"
                >
                  <FaShoppingCart
                    color={
                      orderStatus === "order_placed" ||
                      orderStatus === "shipped" ||
                      orderStatus === "out_for_delivery" ||
                      orderStatus === "delivered"
                        ? getIconColor("order_placed")
                        : "#E0E0E0"
                    }
                  />
                </button>
                <button
                  onClick={() => setOrderStatus("shipped")}
                  className="icon-button"
                >
                  <FaTruck
                    color={
                      orderStatus === "shipped" ||
                      orderStatus === "out_for_delivery" ||
                      orderStatus === "delivered"
                        ? getIconColor("shipped")
                        : "#E0E0E0"
                    }
                  />
                </button>
                <button
                  onClick={() => setOrderStatus("out_for_delivery")}
                  className="icon-button"
                >
                  <FaBicycle
                    color={
                      orderStatus === "out_for_delivery" ||
                      orderStatus === "delivered"
                        ? getIconColor("out_for_delivery")
                        : "#E0E0E0"
                    }
                  />
                </button>
                <button
                  onClick={() => setOrderStatus("delivered")}
                  className="icon-button"
                >
                  <FaHome
                    color={
                      orderStatus === "delivered"
                        ? getIconColor("delivered")
                        : "#E0E0E0"
                    }
                  />
                </button>
              </div>
              <div className="iconLineContainer">
                <FaCheckCircle
                  color={
                    orderStatus === "order_placed" ||
                    orderStatus === "shipped" ||
                    orderStatus === "out_for_delivery" ||
                    orderStatus === "delivered"
                      ? "black"
                      : "#E0E0E0"
                  }
                />
                <span
                  className="horizontalLine"
                  style={{
                    color:
                      orderStatus === "shipped" ||
                      orderStatus === "out_for_delivery" ||
                      orderStatus === "delivered"
                        ? "black"
                        : "#E0E0E0"
                  }}
                >
                  -- -- -- -- --{" "}
                </span>
                <FaCheckCircle
                  color={
                    orderStatus === "shipped" ||
                    orderStatus === "out_for_delivery" ||
                    orderStatus === "delivered"
                      ? "black"
                      : "#E0E0E0"
                  }
                />
                <span
                  className="horizontalLine"
                  style={{
                    color:
                      orderStatus === "out_for_delivery" ||
                      orderStatus === "delivered"
                        ? "black"
                        : "#E0E0E0"
                  }}
                >
                  -- -- -- -- -- --
                </span>
                <FaCheckCircle
                  color={
                    orderStatus === "out_for_delivery" ||
                    orderStatus === "delivered"
                      ? "black"
                      : "#E0E0E0"
                  }
                />
                <span
                  className="horizontalLine"
                  style={{
                    color: orderStatus === "delivered" ? "black" : "#E0E0E0"
                  }}
                >
                  -- -- -- -- -- -
                </span>
                <FaCheckCircle
                  color={orderStatus === "delivered" ? "black" : "#E0E0E0"}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default MyBooking;
