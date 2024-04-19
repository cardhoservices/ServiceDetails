import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

function SubscriptionTracker() {
    const [data, setData] = useState([]);
    const [Phone, setPhone] = useState('');
    const [StartDate, setStartDate] = useState('');
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
    function calculateInteriorCleaningDates(startDate) {
        const start = new Date(startDate);
        const interiorCleaningDates = [];
        let nextInteriorCleaning = new Date(start);
    
        // Move to the next occurrence of the same day of the week as the start date
        while (nextInteriorCleaning.getDay() !== start.getDay()) {
            nextInteriorCleaning.setDate(nextInteriorCleaning.getDate() + 1);
        }
    
        let daysAdded = 0;
    
        while (daysAdded <= 30) {
            if (daysAdded !== 0) {
                interiorCleaningDates.push(nextInteriorCleaning.toDateString());
            }
            daysAdded += 7;
            nextInteriorCleaning.setDate(nextInteriorCleaning.getDate() + 7); // Add 7 days for the next interior cleaning
        }
    
        return interiorCleaningDates;
    }


    // Function to calculate the next interior cleaning date
    function calculateNextInteriorCleaning(StartDate) {
        if (!StartDate) return '';
        const start = new Date(StartDate);
        let nextInteriorCleaning = new Date(start);
        nextInteriorCleaning.setDate(start.getDate() + 7);
        return nextInteriorCleaning.toDateString();
    }

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

    // Function to display subscription details
    function displaySubscriptionDetails(startDate) {
        // console.log(startDate)
        const nextInteriorCleaning = calculateNextInteriorCleaning(startDate);
        const interiorCleaningDates = calculateInteriorCleaningDates(startDate);
        const nextPressureWash = calculateNextPressureWash(startDate);
        const validTill = calculateSubscriptionValidTill(startDate);
        setSubscriptionDetails(`
            <h2>Subscription Details</h2>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>Exterior Cleaning:</strong> Daily</p>
            <p><strong>Interior Cleaning Dates:</strong> ${interiorCleaningDates.join(', ')}</p>
            <p><strong>Pressure Wash:</strong> ${nextPressureWash}</p>
            <p><strong>Valid Till:</strong> ${validTill}</p>
            `);
            // <p><strong>Interior Cleaning:</strong> Every 7 days, starting from ${nextInteriorCleaning}</p>
    }

    // Handle form submission
    async function handleSubmit() {
        try {
            data.map((item) => {
                // console.log(item)
                if (item.Phone == Phone) {
                    // console.log(item.StartDate ? item.StartDate.split("T")[0] : "N/A")
                    setStartDate(item.StartDate?item.StartDate.split("T")[0] : "N/A");
                    displaySubscriptionDetails(item.StartDate?item.StartDate.split("T")[0] : "N/A");
                }
                else {
                    // console.log("Phone number not found")
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="container">
            <h1>CarClub Subscription Tracker</h1>
            <div className='form'>
                <label htmlFor="mobile-number">Enter Mobile Number:</label>
                <input
                    type="number"
                    id="mobile-number"
                    placeholder="Phone Number"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <label htmlFor="start-date">Subscription Start Date:</label>
                <input
                    type="text"
                    id="start-date"
                    name="start-date"
                    disabled
                    defaultValue={StartDate || ''}
                    required
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div id="subscription-details" dangerouslySetInnerHTML={{ __html: subscriptionDetails }} />
        </div>
    );
}

export default SubscriptionTracker;
