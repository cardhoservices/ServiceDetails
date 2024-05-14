import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

function SubscriptionTracker() {
    const [data, setData] = useState([]);
    const [Phone, setPhone] = useState('');
    const [finaldata, setfinaldata] = useState([])
    const [StartDate, setStartDate] = useState("")
    const [subscriptionDetails, setSubscriptionDetails] = useState('');

    // console.log(import.meta.env.VITE_SERVER_URL)
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/get`)
            .then((response) => {
                // console.log(response.data)
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    // Function to calculate the next pressure wash date
    function calculateNextPressureWash(StartDate) {
        if (!StartDate) return '';
        const start = new Date(StartDate);
        let nextPressureWash = new Date(start);
        nextPressureWash.setDate(start.getDate() + 29);
        while (nextPressureWash.getDay() === 0) { // Check if Sunday
            nextPressureWash.setDate(nextPressureWash.getDate() + 1);
        }
        return nextPressureWash.toDateString();
    }

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
            data.map((item) => {
                if (item.Phone == Phone) {
                    // console.log(item.StartDate ? item.StartDate.split("T")[0] : "N/A")
                    setfinaldata(item)
                    setStartDate(item.StartDate.split("T")[0])
                }
                else {
                    // alert("Phone number is not registered, please contact us at +91 8000136486")
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="container">
            <h1>CarDho Tracker</h1>
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
                        <p>{`Start Date: ${StartDate}`}</p>
                        <p>Exterior Cleaning: Daily</p>
                        <p>Interior Cleaning Dates:
                            <ol>
                                <li>{finaldata.interriorfirst ? finaldata.interriorfirst.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorsecond ? finaldata.interriorsecond.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorthird ? finaldata.interriorthird.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorfourth ? finaldata.interriorfourth.split("T")[0] : "N/A"}</li>
                            </ol>
                        </p>
                        <p>{`Pressure Wash: ${calculateNextPressureWash(StartDate)}`}</p>
                        <p>{`Valid Till: ${calculateSubscriptionValidTill(StartDate)}`}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default SubscriptionTracker;
