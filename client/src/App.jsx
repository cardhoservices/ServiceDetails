import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

function SubscriptionTracker() {
    const [Phone, setPhone] = useState('');
    const [finaldata, setfinaldata] = useState([])
    const [StartDate, setStartDate] = useState("")
    const [subscriptionDetails, setSubscriptionDetails] = useState('');

    // console.log(import.meta.env.VITE_SERVER_URL)
    
    
    // Function to calculate the subscription valid till date
    function calculateSubscriptionValidTill(StartDate) {
        if (!StartDate) return '';
        const start = new Date(StartDate);
        let validTill = new Date(start);
        validTill.setDate(start.getDate() + 29);
        return validTill.toDateString();
    }

    // Handle form submission
    async function handleSubmit() {
        try {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/get/${Phone}` )
                .then((res) => {
                    setfinaldata(res.data)
                    setStartDate(res.data.StartDate ? res.data.StartDate.split("T")[0] : "")
                })
                .catch((error) => {
                    // console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="container">
            {/* <h1>CARDHO</h1> */}
            <div className="logo-header">
                <img className='logo-header-img' src="./src/Assets/White Logo 1.png" alt="" />
            </div>
            <span className="h1-span">SUBSCRIPTION TRACKER</span>
            <div className='form'>
                <label htmlFor="mobile-number">Registered Mobile Number</label>
                <input
                    type="number"
                    id="mobile-number"
                    placeholder="Enter registered mobile number"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button onClick={handleSubmit}>Submit</button>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="---"
                    name="name"
                    disabled
                    defaultValue={finaldata.Name || ''}
                    required
                />
                <label htmlFor="start-date">Subscription Start Date</label>
                <input
                    type="text"
                    id="start-date"
                    placeholder="---"
                    name="start-date"
                    disabled
                    defaultValue={StartDate || ''}
                    required
                />
            </div>
            <div id="subscription-details">
                {StartDate && (
                    <>
                        <h2>Subscription Details</h2>
                        <p style={{ fontWeight: 'bold' }}>Car: {finaldata.Car}</p>
                        <p>Exterior Cleaning: Daily</p>
                        <p>Interior Cleaning Dates:
                            <ol>
                                <li>{finaldata.interriorfirst ? finaldata.interriorfirst.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorsecond ? finaldata.interriorsecond.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorthird ? finaldata.interriorthird.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorfourth ? finaldata.interriorfourth.split("T")[0] : "N/A"}</li>
                            </ol>
                        </p>
                        <p>{`Pressure Wash: ${finaldata.PressureWash.split("T")[0]}`}</p>
                        <p>{`Valid Till: ${calculateSubscriptionValidTill(StartDate)}`}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default SubscriptionTracker;
