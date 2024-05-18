import React, {  useState } from 'react';
import './style.css';
import axios from 'axios';

function SubscriptionTracker() {
    const [Phone, setPhone] = useState('');
    const [finaldata, setfinaldata] = useState([])

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
        if (Phone.length !== 10) {
            alert("Please enter valid phone number")
        }
        else {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/get/${Phone}`)
                .then((res) => {
                    setfinaldata(res.data)
                })
                .catch((error) => {
                    alert(error.response.data)
                });
        }

    }
    return (
        <div className="container">
            <div className="header-box-headings">
                <h1>CARDHO</h1>
                <span className="h1-span">SUBSCRIPTION TRACKER</span>
            </div>
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
                    defaultValue={finaldata.Name?finaldata.Name:''}
                    required
                />
                <label htmlFor="start-date">Subscription Start Date</label>
                <input
                    type="text"
                    id="start-date"
                    placeholder="---"
                    name="start-date"
                    disabled
                    defaultValue={finaldata.StartDate?finaldata.StartDate.split("T")[0]:""}
                    required
                />
            </div>
            <div id="subscription-details">
                {finaldata.StartDate && (
                    <>
                        <h2>Subscription Details</h2>
                        <p>Car: {finaldata.Car}</p>
                        <p>Exterior Cleaning: Daily</p>
                        <p>Interior Cleaning Dates:</p>
                            <ol>
                                <li>{finaldata.interriorfirst ? finaldata.interriorfirst.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorsecond ? finaldata.interriorsecond.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorthird ? finaldata.interriorthird.split("T")[0] : "N/A"}</li>
                                <li>{finaldata.interriorfourth ? finaldata.interriorfourth.split("T")[0] : "N/A"}</li>
                            </ol>
                        <p>{`Pressure Wash: ${finaldata.PressureWash ? finaldata.PressureWash.split("T")[0]:"N/A"}`}</p>
                        <p>{`Valid Till: ${finaldata.StartDate?calculateSubscriptionValidTill(finaldata.StartDate.split("T")[0]):"N/A"}`}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default SubscriptionTracker;